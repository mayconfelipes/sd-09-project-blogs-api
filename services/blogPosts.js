const { BlogPost } = require('../models');

const createPost = async ({ title, content, userId }) => {
  const post = await BlogPost.create({ title, content, userId });
  return post;
};

module.exports = {
  createPost,
};
