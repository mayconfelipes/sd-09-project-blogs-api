const {
  createUser,
  listAllUsers,
  findUserById,
} = require('./userControllers');
const { login } = require('./loginController');

module.exports = {
  createUser,
  listAllUsers,
  findUserById,
  login,
};
