const { validUser } = require('./middlewareUserCreate');
const { createToken } = require('./middlewareUserLogin');
const { nameCategory } = require('./middlewareCategories');

module.exports = {
  validUser,
  createToken,
  nameCategory,
};
