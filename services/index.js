const { login } = require('./loginServices');
const { createUser, deleteUser } = require('./userServices');
const { createCategory, listAllCategories } = require('./categoryServices');
const { createPost, updatePostById, deletePostById } = require('./postServices');

module.exports = {
  login,
  createUser,
  createPost,
  createCategory,
  listAllCategories,
  updatePostById,
  deletePostById,
  deleteUser,
};
