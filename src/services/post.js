const Joi = require('joi');

const { BlogPosts, Categories, PostsCategories } = require('../models');

const validateAuth = require('../middlewares/validateAuth');

// error
const objectError = (code, message) => ({
  code,
  message,
});

const validateDataPost = (userWithoutImage) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  }).validate(userWithoutImage);

  if (error) {
    throw objectError('BAD_REQUEST', error.details[0].message);
  }
};

// create user
const create = async (authorization, data) => {
  const payload = await validateAuth(authorization);

  validateDataPost(data);

  const categories = await Categories.findAll({
    where: { id: data.categoryIds },
  });

  if (categories.length !== data.categoryIds.length) {
    throw objectError('BAD_REQUEST', '"categoryIds" not found');
  }

  const { title, content } = data;
  const { id: userId } = payload;

  const post = await BlogPosts.create({ title, content, userId });
  const { published, updated, ...postWithoutDates } = post.dataValues;
  const { id: postId } = post.dataValues;

  data.categoryIds.forEach(async (categoryId) => {
    await PostsCategories.create({ postId, categoryId });
  });

  return postWithoutDates;
};

module.exports = { create };
