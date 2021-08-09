const Joi = require('joi');

const newUserSchema = Joi.object({
  dislayName: Joi.string().min(8).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  image: Joi.string().uri().required(),
});

const checkNewUser = (params) => newUserSchema.validate(params);

const getUser = () => {};

module.exports = { checkNewUser, getUser };