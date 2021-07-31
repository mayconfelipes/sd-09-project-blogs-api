const error = require('./error');
const createToken = require('./createToken');
const validateUser = require('./validateUser');
const emailExists = require('./emailExists');
const validateLogin = require('./validateLogin');

module.exports = {
  error,
  createToken,
  validateUser,
  emailExists,
  validateLogin,
};
