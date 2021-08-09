const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const CATEGORY_NOT_FOUND = { status: 400, message: '"categoryIds" not found' };

const verifyIfCategoryExists = async (categoryIds) => {
  const catExists = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  // [Op.in]: [1, 2],  ==== SQL IN [1, 2]
  if (catExists.length === categoryIds.length) return true;
  return false;
};

const createPost = async (newPost, userId) => {
  const { categoryIds, title, content } = newPost;
  const categoryExists = await verifyIfCategoryExists(categoryIds);
  if (!categoryExists) throw CATEGORY_NOT_FOUND;
  await BlogPost.create({ title, content, userId });
  const blogPost = await BlogPost.findOne({ where: { title, content, userId } });
  console.log(blogPost);
  return blogPost;
};

const getAllPosts = async () => {
  const blogPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories' },
  ] });
  return blogPosts;
};

module.exports = {
  createPost,
  getAllPosts,
};