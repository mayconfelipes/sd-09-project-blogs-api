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

module.exports = {
  createUser,
  login,
};