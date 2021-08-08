const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');

const createBlogPosts = async ({ title, content, categoryIds, userId }) => {
  const findCategories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  // Op é um operador do sequelize que assume igualdade padrão do SQL.
  // console.log(findCategories.length);
  // console.log(categoryIds.length);
  if (findCategories.length !== categoryIds.length) return false;

  const postsCreate = await BlogPost.create({ title, content, userId });
  // console.log(postsCreate);
  return postsCreate;
};

const getAllPosts = async () => {
  const blogPost = await BlogPost
    .findAll({ include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] });
    console.log('service', blogPost);

  return blogPost;
};

module.exports = {
  createBlogPosts,
  getAllPosts,
};