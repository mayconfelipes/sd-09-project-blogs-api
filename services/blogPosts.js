const { BlogPosts, Users, Categories } = require('../models');

const createPost = async (title, content, userId) => {
  const { dataValues } = await BlogPosts.create({ title, content, userId });
  const { id } = dataValues;
  return { id, userId, title, content };
};

const getAllPosts = async () => {
  const result = await BlogPosts.findAll({ include: [
    { model: Users, as: 'user' },
    { model: Categories, as: 'categories' },
  ] });
  return result;
};

module.exports = {
  createPost,
  getAllPosts,
}; 
