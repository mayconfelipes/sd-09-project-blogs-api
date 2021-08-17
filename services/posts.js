const boom = require('@hapi/boom');
const postSchema = require('../schema/post');
const { Category, BlogPost } = require('../models');

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

module.exports = {
  createPost,
};
