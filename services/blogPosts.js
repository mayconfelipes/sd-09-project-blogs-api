const { BlogPosts } = require('../models');

const createPost = async (title, content, userId) => {
  const { dataValues } = await BlogPosts.create({ title, content, userId });
  const { id } = dataValues;
  return { id, userId, title, content };
};

module.exports = {
  createPost,
}; 
