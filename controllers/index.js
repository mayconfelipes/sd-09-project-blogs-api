const { login } = require('./loginController');
const {
  createUser,
  listAllUsers,
  findUserById,
} = require('./userControllers');
const {
  createCategory,
  listAllCategories,
} = require('./categoryController');

module.exports = {
  login,
  createUser,
  listAllUsers,
  findUserById,
  createCategory,
  listAllCategories,
};
