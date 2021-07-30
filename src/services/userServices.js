const Joi = require('joi');
const { userModel } = require('../models');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min().required(),
});

const validateError = (status, message) => ({ status, message });

const create = async ({ displayName, email, password, image }) => {
  const { error } = userSchema.validate({ displayName, email, password });
  console.log(error, 'mensagem de erro do joi');
  if (error) throw validateError(400, 'Invalid entries. Try again.');
  const userByEmail = await userModel.findOne({ where: { email } });
  if (userByEmail.length > 0) throw validateError(409, 'User already registered');
  const idObject = await userModel.create({ displayName, email, password, image });
  return idObject;
};

module.exports = {
  create,
};