const boom = require('@hapi/boom');
const postCreateSchema = require('../schema/postCreate');
const postUpdateSchema = require('../schema/postUpdate');
const { Category, BlogPost, User } = require('../models');

const validateCreateSchema = (payload) => {
  const { userId, ...postParams } = payload;
  const { error } = postCreateSchema.validate({ ...postParams });

  if (error) throw error;
};

const validateCategoryId = async (categoryIds) => {
  const result = await Category.findAll({
    where: {
      id: [...categoryIds],
    },
  });

  if (result.length === 0) throw boom.badRequest('"categoryIds" not found');
  return result;
};

const createPost = async (payload) => {
  validateCreateSchema(payload);
  const { categoryIds, ...restPostParams } = payload;

  await validateCategoryId(categoryIds);

  const result = await BlogPost.create({ ...restPostParams });

  return result;
};

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const getById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) throw boom.notFound('Post does not exist');

  return result;
};

const validationsPostUpdate = async (payload, postId, userId) => {
  const blogPost = await BlogPost.findByPk(postId);
  const user = await blogPost.getUser();

  if (userId !== user.dataValues.id) throw boom.unauthorized('Unauthorized user');

  if (payload.categoryIds) throw boom.badRequest('Categories cannot be edited');

  const { error } = postUpdateSchema.validate({ ...payload });
  if (error) throw error;
};

const updatePost = async (payload, postId, userId) => {
  await validationsPostUpdate(payload, postId, userId);

  await BlogPost.update({ ...payload }, { where: { id: postId } });

  const post = await BlogPost.findByPk(postId, {
    attributes: { exclude: ['published', 'updated', 'id'] },
  });

  const { categories } = await BlogPost.findByPk(postId, { 
    include: { model: Category, as: 'categories', through: { attributes: [] } }, 
  });

  return { ...post.dataValues, categories };
};

const validationsPostDelete = async (postId, userId) => {
  const blogPost = await BlogPost.findByPk(postId);
  const user = await blogPost.getUser();
  
  if (userId !== user.dataValues.id) throw boom.unauthorized('Unauthorized user');
};

const deletePost = async (postId, userId) => {
  const postExists = await BlogPost.findByPk(postId);
  if (!postExists) throw boom.notFound('Post does not exist');

  await validationsPostDelete(postId, userId);

  await BlogPost.destroy({
    where: { id: postId },  
  });
};

module.exports = {
  getAll,
  getById,
  deletePost,
  createPost,
  updatePost,
};
