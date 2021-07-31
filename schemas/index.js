const { validateError, joiError } = require('./validateError');
const UserSchema = require('./UserSchema');
const postSchema = require('./postSchema');
const LoginSchema = require('./LoginSchema');
const CategorySchema = require('./CategorySchema');
const updatePostSchema = require('./updatePostSchema');

module.exports = {
  joiError,
  validateError,
  UserSchema,
  postSchema,
  LoginSchema,
  CategorySchema,
  updatePostSchema,
};