const { BlogPost } = require('../models');

const createPost = async (postData) => {
  const newPost = await BlogPost.create(postData);
  const { id, title, content, userId } = newPost.dataValues;
  return { id, title, content, userId };
};

module.exports = { createPost };
