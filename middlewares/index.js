const errorMiddlewares = require('./errorMiddlewares');
const validUser = require('./validUser');
const createToken = require('./createToken');
const validLogin = require('./validLogin');
const validJWT = require('./validJWT');
const validCategory = require('./validCategory');
const validPost = require('./validPost');
const validUpdatePost = require('./validUpdatePost');

module.exports = {
  errorMiddlewares,
  validUser,
  createToken,
  validLogin,
  validJWT,
  validCategory,
  validPost,
  validUpdatePost,
};