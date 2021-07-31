const jwt = require('jsonwebtoken');
const { BlogPosts } = require('../models');

const createNewPost = async (title, content, categoryIds, token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const newPost = await BlogPosts.create({ userId: payload.id, title, content });
  return {
    id: newPost.dataValues.id,
    userId: newPost.dataValues.userId,
    title: newPost.dataValues.title,
    content: newPost.dataValues.content,
  };
};

module.exports = {
  createNewPost,
};
