const { login } = require('./loginServices');
const { createUser } = require('./userServices');
const { createCategory, listAllCategories } = require('./categoryServices');

module.exports = {
  login,
  createUser,
  createCategory,
  listAllCategories,
};
