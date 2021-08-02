const Joi = require('joi');
const { BlogPost, Category } = require('../models');

const validatePostInfo = (data) =>
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(data);

  const validateCategory = async (data) => {
    const { categoryIds } = data;
    return Promise.all(categoryIds.map((id) => Category.findByPk(id)));
  };

const createPost = async (data, user) => {
  const { error } = validatePostInfo(data);
  if (error) {
    const postInfoResponse = { code: 400, message: error.details[0].message };
    throw postInfoResponse;
  }

  const categories = await validateCategory(data);
  const invalidCategory = categories.find((e) => e === null);
  if (invalidCategory === null) {
    const invalidCategoryMessage = { code: 400, message: '"categoryIds" not found' };
    throw invalidCategoryMessage;
  }
  
  const { id } = user;
  const newPost = await BlogPost.create(data);
  return { ...newPost.dataValues, userId: id, categories };
};

const getAllPosts = async (user) => {
  const blogPostsList = await BlogPost.findAll({ where: { userId: user.id } });

  if (blogPostsList.length === 0) return { message: 'No posts yet' };

  const newList = Promise.all(blogPostsList.map(async (e) => {
    const blogPost = await BlogPost.findByPk(e.id);
    const categories = await blogPost.getCategories();
    return { ...blogPost.dataValues, user, categories: [categories] };
  }));

  return newList;
};

const getPostById = async (id) => {
  const postById = await BlogPost.findByPk(id);

  if (!postById) {
    const noPostMessage = { code: 404, message: 'Post does not exist' };
    throw noPostMessage;
  }

  const user = await postById.getUsers();
  const categories = await postById.getCategories();

  return { ...postById.dataValues, user, categories: [categories] };
};

const updatePost = async (body, id, user) => {
  const blogPosts = await BlogPost.findByPk(id);
  if (blogPosts.userId !== user.id) {
    const unauthorizedMessage = { code: 401, message: 'Unauthorized user' };
    throw unauthorizedMessage;
  }

  const updatedPost = await BlogPost.update(body, { where: id });
  // if (!userById) throw noPostMessage;

  return updatedPost;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
}; 