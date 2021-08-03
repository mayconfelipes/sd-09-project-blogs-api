const Joi = require('joi');

const { BlogPost, PostsCategory } = require('../models');
const { InvalidArgumentError, NotFoundError } = require('../errors');
const categoriesService = require('./categoriesService');
const usersService = require('./usersService');

const BlogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
  userId: Joi.number().required(),
});

const validateCategories = async (categories) => {
  const catArray = await categoriesService.getAll()
    .then((result) => result.map(({ id }) => id));
  const containsAll = categories.every((category) => catArray.includes(category));

  if (!containsAll) throw new InvalidArgumentError('"categoryIds" not found');
};

const mapPostCategories = async (id) => {
  const categories = await categoriesService.getAll();
  const postCategories = await PostsCategory.findAll({ where: { postId: id } })
    .then((result) => result.map(({ categoryId }) => categoryId));
  return categories.filter((category) => postCategories.includes(category.id));
};

const retrievePostSerializer = async (data) => {
  const { userId, ...post } = data;

  post.categories = await mapPostCategories(post.id);
  post.user = await usersService.getById(userId);

  return post;
};

module.exports = {
  async create(payload) {
    const { error } = BlogPostSchema.validate(payload);

    if (error) throw new InvalidArgumentError(error.message);

    await validateCategories(payload.categoryIds);

    const post = await BlogPost.create(payload);
    const { updated, published, ...response } = post.dataValues;

    payload.categoryIds.forEach((categoryId) => {
      PostsCategory.create({ categoryId, postId: post.id });
    });

    return response;
  },
  async getAll() {
    const posts = await BlogPost.findAll();

    const response = await Promise.all(
      posts.map(({ dataValues }) => retrievePostSerializer(dataValues)),
    );

    return response;
  },
  async getById(id) {
    const post = await BlogPost.findOne({ where: { id } });

    if (!post) throw new NotFoundError('Post');

    return retrievePostSerializer(post.dataValues);
  },
};