const tokenGenerator = require('./tokenGenerator');
const checkDisplayName = require('./checkDisplayName');
const checkEmail = require('./checkEmail');
const checkPassword = require('./checkPassword');

module.exports = { 
  tokenGenerator,
  checkDisplayName,
  checkEmail,
  checkPassword };