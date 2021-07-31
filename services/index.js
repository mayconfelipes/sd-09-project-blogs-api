const { login } = require('./loginServices');
const { createUser } = require('./userServices');
const { createCategory, listAllCategories } = require('./categoryServices');
const { createPost, updatePostById } = require('./postServices');

module.exports = {
  login,
  createUser,
  createPost,
  createCategory,
  listAllCategories,
  updatePostById,
};
