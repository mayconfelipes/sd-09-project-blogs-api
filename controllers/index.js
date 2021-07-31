const { login } = require('./loginController');
const {
  createUser,
  listAllUsers,
  findUserById,
  deleteUser,
} = require('./userControllers');
const {
  createCategory,
  listAllCategories,
} = require('./categoryController');
const {
  createPost,
  listAllPosts,
  findPostById,
  updatePostById,
  deletePostById,
} = require('./postController');

module.exports = {
  login,
  createUser,
  createPost,
  createCategory,
  listAllUsers,
  listAllPosts,
  listAllCategories,
  findUserById,
  findPostById,
  updatePostById,
  deleteUser,
  deletePostById,
};
