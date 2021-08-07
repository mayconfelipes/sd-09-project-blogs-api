const { validUser } = require('./middlewareUserCreate');
const { createToken } = require('./middlewareUserLogin');

module.exports = {
  validUser,
  createToken,
};
