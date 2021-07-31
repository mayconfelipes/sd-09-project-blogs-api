const { BlogPost } = require('../models');
const categoryServices = require('./categories');

const verifyPostCategories = async (categoryIds) => (
  Promise.all(categoryIds.map((categoryId) => categoryServices.getById(categoryId)))
  // Referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
);

const create = async ({ userId, title, content, categoryIds }) => {
  const categories = await verifyPostCategories(categoryIds);
  const error = categories.find((category) => category.error);

  if (error) return error;

  const createdPost = await BlogPost.create({ userId, title, content });
  const { updated, published, ...post } = createdPost.dataValues;
  return post;
};

module.exports = {
  create,
};
