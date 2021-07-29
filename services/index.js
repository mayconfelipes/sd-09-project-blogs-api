const { auth } = require('./auth');
const { loginCheck, loginFindCheck } = require('./login');
const { createToken } = require('./token');
const { userCheck, emailCheck, userCreate } = require('./user');
const { categoryCheck } = require('./category');
const { blogPostCheckFields, blogPostCheckCategory } = require('./blogPost');
const { status, message } = require('./statusMessages');

module.exports = {
  auth,
  loginCheck,
  loginFindCheck,
  createToken,
  userCheck,
  emailCheck,
  userCreate,
  categoryCheck,
  blogPostCheckFields,
  blogPostCheckCategory,
  status,
  message,
};