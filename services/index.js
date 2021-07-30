const { login } = require('./loginServices');
const { createUser } = require('./userServices');
const { createCategory } = require('./categoryServices');

module.exports = {
  login,
  createUser,
  createCategory,
};
