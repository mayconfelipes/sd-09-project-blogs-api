const error = require('./error');
const createToken = require('./createToken');
const validateUser = require('./validateUser');
const emailAlreadyExists = require('./emailAlreadyExists');

module.exports = {
  error,
  createToken,
  validateUser,
  emailAlreadyExists,
};
