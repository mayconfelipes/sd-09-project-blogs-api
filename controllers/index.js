const { login } = require('./loginController');
const {
  createUser,
  listAllUsers,
  findUserById,
} = require('./userControllers');
const {
  createCategory,
} = require('./categoryController');

module.exports = {
  login,
  createUser,
  listAllUsers,
  findUserById,
  createCategory,
};
