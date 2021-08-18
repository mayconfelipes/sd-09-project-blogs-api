const Joi = require('joi');

const { BlogPosts, Categories, PostsCategories, Users } = require('../models');

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

// create post
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

// list all post with user and categories
const list = async (authorization) => {
  await validateAuth(authorization);

  const post = await BlogPosts.findAll({
    // concatena os dados de outra model associada
    include: [
      {
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      // concatena quando model esta num relacionamento N:N
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};
// list post by id
const listById = async (authorization, id) => {
  await validateAuth(authorization);

  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      {
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    throw objectError('NOT_FOUND', 'Post does not exist');
  }

  return post;
};

module.exports = {
  create,
  list,
  listById,
};
