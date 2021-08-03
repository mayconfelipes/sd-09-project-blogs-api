const Joi = require('joi');

const { BlogPost, PostsCategory } = require('../models');
const { InvalidArgumentError } = require('../errors');
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
      posts.map(async ({ dataValues }) => {
        const { userId, ...post } = dataValues;

        const categories = await categoriesService.getAll();
        const postCategories = await PostsCategory.findAll({ where: { postId: post.id } })
          .then((result) => result.map(({ categoryId }) => categoryId));
        console.log(post.id);
        post.categories = categories.filter(({ id }) => postCategories.includes(id));

        post.user = await usersService.getById(userId);

        return post;
      }),
    );

    return response;
  },
};