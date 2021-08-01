const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const { Users } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const schemaUserCreate = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.base': '"email" must be a valid email',
      'string.empty': '"email" is required',
    }),
  displayName: Joi.string().min(8).required()
    .messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
  password: Joi.string().min(6).required()
  .messages({
    'string.empty': '"password" is required',
    'string.min': '"password" length must be 6 characters long',
  }),
});

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

const validateUserData = (code, message) => ({ code, message });

const create = async (email, displayName, password, image) => {
  const { error } = schemaUserCreate.validate({ email, displayName, password });
  if (error) {
    const { message } = error.details[0];
    throw validateUserData(400, message);
  }
 
  const emailRegistered = await Users.findOne({ where: { email } });
  if (emailRegistered) {
    throw validateUserData(409, 'User already registered');
  }
  await Users.create({ displayName, email, password, image });

  const token = jwt.sign(
    { data: [displayName, email, password, image] }, secret, jwtConfig,
  );
  return token;
};

const login = async (email, password) => {
  const { error } = schemaUserLogin.validate({ email, password });

  if (error) {
    const { message } = error.details[0];
    throw validateUserData(400, message);
  }

  const emailRegistered = await Users.findOne({ where: { email, password } });
  
  if (!emailRegistered) {
    throw validateUserData(400, 'Invalid fields');
  }

  const token = jwt.sign(
    { data: [email, password] }, secret, jwtConfig,
  );
  return token;
};

module.exports = {
  create,
  login,
};