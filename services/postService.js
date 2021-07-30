const { BlogPosts } = require('../models');

const createPost = async (title, content, _categoryIds) => {
  const { dataValues } = await BlogPosts.create({ title, content, userId: 1 });

  const { id } = dataValues;

  return { id, userId: 1, title, content };
};

module.exports = {
  createPost,
};
