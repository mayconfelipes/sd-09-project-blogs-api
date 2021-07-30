const { BlogPost } = require('../models');

const create = async ({ title, content }, userId) => {
  const newBlogPost = await BlogPost.create({ title, content, userId });

  return newBlogPost.dataValues;
};

module.exports = {
  create,
};