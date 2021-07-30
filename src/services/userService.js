require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
const emailExistsMessage = { code: 409, message: 'User already registered' };

const validateUserInfo = (data) =>
  Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
      'any.required': '"displayName" is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
    }),
    image: Joi.string(),
  }).validate(data);

const validateUserEmail = async (data) => {
  const { email } = data;
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail) return true;
};

const createUser = async (data) => {
  const { error } = validateUserInfo(data);

  if (error) {
    const userInfoResponse = { code: 400, message: error.details[0].message };
    throw userInfoResponse;
  }

  const emailExists = await validateUserEmail(data);
  if (emailExists) throw emailExistsMessage;

  const newUser = await User.create(data);
  const { email, password } = newUser;
  const token = jwt.sign({ email, password }, JWT_SECRET);
  return { token };
};

module.exports = {
  createUser,
}; 