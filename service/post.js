const jwt = require('jsonwebtoken');
const { BlogPosts, Users, Categories } = require('../models');

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

const getAll = async () => {
  const allPosts = await BlogPosts.findAll({
    include: [
      {
        model: Users, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: Categories, as: 'categories',
      },
    ],
  });
  return allPosts;
};

module.exports = {
  createNewPost,
  getAll,
};
