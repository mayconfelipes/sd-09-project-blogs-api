const joi = require('joi');
const { User } = require('../models');
const { messages, codes, objectError } = require('../util/responseHandling');
const { createToken } = require('../util/tokenGenerate');

const loginValidator = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const Login = async (email, password) => {
  const { error } = loginValidator.validate({ email, password });
  if (error) return objectError(error.details[0].message, codes.CODE_400);

  const loginValid = await User.findOne({ where: { email, password } });
  if (!loginValid) return objectError(messages.INVALID_FIELDS, codes.CODE_400);
  
  return createToken({ email, password }, codes.CODE_200);
};

module.exports = { Login };