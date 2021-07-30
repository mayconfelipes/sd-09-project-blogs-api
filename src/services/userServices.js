const Joi = require('joi');
const { User } = require('../models');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateError = (status, message) => ({ status, message });

const create = async ({ displayName, email, password, image }) => {
  const { error } = userSchema.validate({ displayName, email, password });
  if (error) throw validateError(400, error.details[0].message);
  const userByEmail = await User.findOne({ where: { email } });
  if (userByEmail) throw validateError(409, 'User already registered');
  const idObject = await User.create({ displayName, email, password, image });
  return idObject;
};

module.exports = {
  create,
};