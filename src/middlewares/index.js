const validateDisplayName = require('./validateDisplayName');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const validateLoginFields = require('./validateLoginFields');
const validateToken = require('./validateToken');
const handleError = require('./handleError');

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateLoginFields,
  validateToken,
  handleError,
};
