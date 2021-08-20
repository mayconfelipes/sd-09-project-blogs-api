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

const getPostById = async (id) => {
  const result = await BlogPosts.findOne({
    where: { id }, 
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories' },
    ] });
  return result;
};

const updatePost = async (id, title, content) => {
  await BlogPosts.update({ title, content }, { where: { id } });
  const result = await BlogPosts.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [{
      model: Categories,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return result;
};

const deletePost = async (id) => {
  await BlogPosts.destroy({ where: { id } });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
}; 
