const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { errorHandling } = require('../utils');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const createUser = async (displayName, email, password, image) => {
   const { error } = schemaUser.validate({ displayName, email, password });

  if (error) {
    throw errorHandling(400, error.details[0].message);
  }

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw errorHandling(409, 'User already registered');
  }

  const newUser = await User.create({ displayName, email, password, image });

  const { password: _, ...userWithoutPassword } = newUser.dataValues;

  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);

  return token;
};

module.exports = {
  createUser,
};