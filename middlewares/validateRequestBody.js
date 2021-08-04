const Schemas = require('./schemas');
const Errors = require('../util/errors');

const createUser = (req, _res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = Schemas.postUser.validate({ displayName, email, password, image });

  if (error) next(new Errors.JoiError(error.message));

  next();
};

const login = (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = Schemas.login.validate({ email, password });

  if (error) next(new Errors.JoiError(error.message));

  next();
};

const createCategory = (req, _res, next) => {
  const { name } = req.body;
  
  const { error } = Schemas.postCategory.validate({ name });

  if (error) next(new Errors.JoiError(error.message));

  next();
};

const createPost = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = Schemas.postPost.validate({ title, content, categoryIds });

  if (error) next(new Errors.JoiError(error.message));

  next();
};

module.exports = {
  createUser,
  login,
  createCategory,
  createPost,
};