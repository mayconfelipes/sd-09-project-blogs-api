const error = require('./error');
const createToken = require('./createToken');
const validateUser = require('./validateUser');
const emailExists = require('./emailExists');
const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');

module.exports = {
  error,
  createToken,
  validateUser,
  emailExists,
  validateLogin,
  validateToken,
};
