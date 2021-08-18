const boom = require('@hapi/boom');
const postSchema = require('../schema/post');
const { Category, BlogPost, User } = require('../models');

const validateSchema = (payload) => {
  const { title, content, categoryIds } = payload;
  const { error } = postSchema.validate({ title, content, categoryIds });

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
  validateSchema(payload);
  const { categoryIds } = payload;
  const { title, content, userId } = payload;

  await validateCategoryId(categoryIds);

  const result = await BlogPost.create({ title, content, userId });

  return result;
};

const getAll = async () => {
  const result = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

  return result;
};

const getById = async (id) => {
  const result = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

  if (!result) throw boom.notFound('Post does not exist');

  return result;
};

module.exports = {
  getAll,
  getById,
  createPost,
};
