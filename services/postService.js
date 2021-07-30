const { Post, Category } = require('../models');

const createPost = async (userId, { title, categoryIds, content }) => {
  const categories = categoryIds.map(async (id) => Category.findByPk(id));
  const resultPromiseCategories = await Promise.all(categories); // resolve o array de promise

  const errorMessage = {
    error: {
      code: 'categoryIdsNotFound',
      message: '"categoryIds" not found',
    },
  };

  if (resultPromiseCategories.includes(null)) return errorMessage;

  // console.log(userId);

  const post = await Post.create({ userId, title, content });
  return post;
};

module.exports = {
  createPost,
};