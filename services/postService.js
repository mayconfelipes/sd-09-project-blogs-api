const { BlogPosts, Users } = require('../models');

const createPost = async (title, content, userId, categoryIds) => {
  const { dataValues } = await BlogPosts.create({ title, content, userId, categoryIds });

  const { id } = dataValues;

  return { id, userId, title, content };
};

const getAllPost = async () => {
  const getAll = await BlogPosts.findAll({
    include: [{
      model: Users, as: 'user', attributes: { exclude: ['password'] },
    }],
  });

  return getAll;
};

const getById = async (id) => {

};

const editPost = async (id) => {

};

const deletePost = async (id) => {
  await BlogPosts.destroy({ where: { id } });  
};

module.exports = {
  createPost,
  getAllPost,
  getById,
  editPost,
  deletePost,
};
