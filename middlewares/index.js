const tokenGenerator = require('./tokenGenerator');
const checkDisplayName = require('./checkDisplayName');
const checkEmail = require('./checkEmail');
const checkPassword = require('./checkPassword');
const checkIfUserAlreadyExist = require('./checkIfUserAlreadyExist');
const checkIfLoginIsValid = require('./checkIfLoginIsValid');
const tokenValidation = require('./tokenValidation');
const checkTitleAndContentPost = require('./checkTitleAndContentPost');
const checkCategoryId = require('./checkCategoryId');
const checkPostUserId = require('./checkPostUserId');
const blockCategoriesFromBeingEdited = require('./blockCategoriesFromBeingEdited');
const checkIfPostExist = require('./checkIfPostExist');

module.exports = { 
  tokenGenerator,
  checkDisplayName,
  checkEmail,
  checkPassword,
  checkIfUserAlreadyExist,
  checkIfLoginIsValid, 
  tokenValidation,
  checkTitleAndContentPost,
  checkCategoryId,
  checkPostUserId,
  blockCategoriesFromBeingEdited,
  checkIfPostExist };