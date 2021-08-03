const Joi = require('joi');
const { BlogPost, Category } = require('../models');

const validatePostInfo = (data) =>
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(data);

const validatePostUpdateInfo = (data) => {
  if (data.categoryIds) {
    return { error: { details: [{ message: 'Categories cannot be edited' }] } };
  }

  return Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(data);
};

const validateCategory = async (data) => {
  const { categoryIds } = data;
  return Promise.all(categoryIds.map((id) => Category.findByPk(id)));
};

const validateExistingPost = async (postId) => {
  const postById = await BlogPost.findByPk(postId);

  if (!postById) {
    const noPostMessage = { code: 404, message: 'Post does not exist' };
    throw noPostMessage;
  }
  return postById;
};

const validateUser = async (postId, userId) => {
  const blogPost = await validateExistingPost(postId);

  if (blogPost.userId !== userId) {
    const unauthorizedMessage = { code: 401, message: 'Unauthorized user' };
    throw unauthorizedMessage;
  }

  return blogPost;
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
  const postById = await validateExistingPost(id);

  const user = await postById.getUsers();
  const categories = await postById.getCategories();
  return { ...postById.dataValues, user, categories: [categories] };
};

const updatePost = async (body, id, user) => {
  const { error } = validatePostUpdateInfo(body);

  if (error) {
    const postInfoResponse = { code: 400, message: error.details[0].message };
    throw postInfoResponse;
  }

  const blogPost = await validateUser(id, user.id);

  const userId = await blogPost.getUsers();
  const categories = await blogPost.getCategories();

  const updatedPost = await BlogPost.update(body, { where: { id } });

  if (updatedPost[0] === 1) return { ...body, userId: userId.id, categories: [categories] };
};

const deletePost = async (postId, user) => {
  const { id } = user;

  await validateUser(postId, id);
  await BlogPost.destroy({ where: { id: postId } });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
}; 