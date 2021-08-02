const Joi = require('joi');
const { InvalidArgumentError } = require('../errors');
const { User } = require('../models');
const tokens = require('../tokens');

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = async (payload) => {
  const { error } = LoginSchema.validate(payload);

  if (error) {
    throw new InvalidArgumentError(error.message);
  }

  const user = await User.findOne({ where: { ...payload } });
  if (!user) throw new InvalidArgumentError('Invalid fields');

  const { password, ...userData } = user.dataValues;
  const token = tokens.access.create(userData);
  return { token };
};