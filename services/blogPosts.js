const { BlogPost, User, Category } = require('../models');
const categoryServices = require('./categories');
const postCategoryServices = require('./postsCategories');

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

  categoryIds.forEach(async (categoryId) => {
    await postCategoryServices.create({
      postId: post.id,
      categoryId,
    });
  });
  
  return post;
};

const getAll = async () => {
  const blogPostsList = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return blogPostsList;
};

module.exports = {
  create,
  getAll,
};
