const Joi = require('joi');
const { Op } = require('sequelize');

const { BlogPost, PostsCategory } = require('../models');
const { InvalidArgumentError, NotFoundError, AccessError } = require('../errors');
const categoriesService = require('./categoriesService');
const usersService = require('./usersService');

const BlogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
  userId: Joi.number().required(),
  id: Joi.number(),
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

    return Promise.all(
      posts.map(({ dataValues }) => retrievePostSerializer(dataValues)),
    );
  },
  async getById(id) {
    const post = await BlogPost.findOne({ where: { id } });

    if (!post) throw new NotFoundError('Post');

    return retrievePostSerializer(post.dataValues);
  },
  async update(payload) {
    const { categoryIds: _, userId, id, ...data } = payload;
    const prevPostData = await BlogPost.findOne({ where: { id } });

    if (!prevPostData) throw new NotFoundError('Post');

    const { userId: postUserId } = prevPostData.dataValues;

    if (postUserId !== payload.userId) throw new AccessError('Unauthorized user');

    const { error } = BlogPostSchema.validate(payload);

    if (error) throw new InvalidArgumentError(error.message);

    await BlogPost.update(data, { where: { id } });

    const categories = await mapPostCategories(id);
    return { ...data, id, userId, categories };
  },
  async remove({ id, userId }) {
    const post = await BlogPost.findOne({ where: { id } });

    if (!post) throw new NotFoundError('Post');

    const { userId: postUserId } = post.dataValues;

    if (userId !== postUserId) throw new AccessError('Unauthorized user');

    return BlogPost.destroy({ where: { id } });
  },
  async getByTitleOrContent(query) {
    const likeQuery = `%${query}%`;
    const posts = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: likeQuery } },
          { content: { [Op.like]: likeQuery } },
        ],
      },
    });

    return !posts.length
      ? posts
      : Promise.all(
        posts.map(({ dataValues }) => retrievePostSerializer(dataValues)),
      );
  },
};