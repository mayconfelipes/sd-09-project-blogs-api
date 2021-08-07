const { Op } = require('sequelize');
const { BlogPost, Category } = require('../models');

const createBlogPosts = async ({ title, content, categoryIds, userId }) => {
  const findCategories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  // console.log(findCategories.length);
  // console.log(categoryIds.length);
  if (findCategories.length !== categoryIds.length) return false;

  const postsCreate = await BlogPost.create({ title, content, userId });
  console.log(postsCreate);
  return postsCreate;
};

const getAllPosts = async () => {
  const blogPost = await BlogPost.findAll();
  return blogPost;
};

module.exports = {
  createBlogPosts,
  getAllPosts,
};