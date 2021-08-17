const { Op } = require('sequelize'); // Comparação.
const { BlogPost } = require('../models');
const { User, Category } = require('../models');

const erro = require('../utils/error');

const existCategory = async (categoryIds) => {
  const ctgExists = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });

  if (ctgExists.length === categoryIds.length) {
    return true;
  }

  return false;
};

const createPostService = async (newPost, userId) => {
  const { categoryIds, title, content } = newPost;
  const categoryExists = await existCategory(categoryIds);

  if (!categoryExists) throw erro.CATEGORY_NOT_FOUND;

  const blogPost = await BlogPost.create({ title, content, userId });
  return blogPost;
};

const getAllPostsService = async () => {
  const blogPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories' },
  ] });
  return blogPosts;
};

module.exports = {
  createPostService,
  getAllPostsService,
};