const Joi = require('joi');

const { BlogPosts, Categories, PostsCategories, Users } = require('../models');

const validateAuth = require('../middlewares/validateAuth');

// error
const objectError = (code, message) => ({
  code,
  message,
});

const validatePostCreate = (data) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  }).validate(data);

  if (error) {
    throw objectError('BAD_REQUEST', error.details[0].message);
  }
};

const validatePostEdit = (data) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).optional(),
  }).validate(data);

  if (error) {
    throw objectError('BAD_REQUEST', error.details[0].message);
  }
};

const userCanEdit = async (id, payloadId) => {
  const postUser = await BlogPosts.findOne({
    where: { id },
  });

  if (postUser.userId !== payloadId) {
    throw objectError('UNAUTHORIZED', 'Unauthorized user');
  }
};

const hasCategories = (categoryIds) => {
  if (categoryIds) {
    throw objectError('BAD_REQUEST', 'Categories cannot be edited');
  }
};

// create post
const create = async (authorization, data) => {
  const payload = await validateAuth(authorization);

  validatePostCreate(data);

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

// edit post
const edit = async (authorization, id, data) => {
  const payload = await validateAuth(authorization);

  validatePostEdit(data);
  hasCategories(data.categoryIds);
  await userCanEdit(id, payload.id);

  await BlogPosts.update({ ...data }, { where: { id } });

  const postEdited = await BlogPosts.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [
      {
        model: Categories,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return postEdited;
};

module.exports = {
  create,
  list,
  listById,
  edit,
};
