require('dotenv').config();

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
const invalidFieldMessage = { message: 'Invalid fields' };

const validateLoginInfo = (data) =>
  Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
    }),
  }).validate(data);

const validateUserEmail = async (data) => {
  const { email } = data;
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail) return true;
};

const loginUser = async (data) => {
  const { error } = validateLoginInfo(data);

  if (error) {
    const loginInfoResponse = { message: error.details[0].message };
    throw loginInfoResponse;
  }

  const loginValid = await validateUserEmail(data);
  if (!loginValid) throw invalidFieldMessage;

  const { email, password } = loginValid;
  const token = jwt.sign({ email, password }, JWT_SECRET);
  return { token };
};

module.exports = {
  loginUser,
};