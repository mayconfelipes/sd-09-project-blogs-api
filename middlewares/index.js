const { validUser } = require('./middlewareUserCreate');
const { createToken } = require('./middlewareUserLogin');
const { nameCategory } = require('./middlewareCategories');
const { validPost } = require('./middlewarePost');

module.exports = {
  validUser,
  createToken,
  nameCategory,
  validPost,
};
