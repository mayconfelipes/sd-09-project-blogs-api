const validateDisplayName = require('./validateDisplayName');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const handleError = require('./handleError');

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  handleError,
};
