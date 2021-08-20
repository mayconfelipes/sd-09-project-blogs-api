const validateDisplayName = require('./validateDisplayName');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const validateToken = require('./validateToken');
const validateUserExists = require('./validateUserExists');
const validatePostContent = require('./validatePostContent');
const validateCategory = require('./validateCategory');

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateToken,
  validateUserExists,
  validatePostContent,
  validateCategory,
};