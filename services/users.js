require('dotenv').config();
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const userSchema = require('../schema/user');
const { User } = require('../models');

const findUserExists = async (email) => {
  const result = await User.findAll({ where: { email } });
  if (result.length > 0) throw boom.conflict('User already registered');
};

const createToken = (id, email) => {
  const secret = process.env.JWT_SECRET;

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { id, email } }, secret, jwtConfig);
  return token;
};

const createUser = async (payload) => {
  const { displayName, email, password } = payload;
  const { error } = userSchema.validate({ displayName, email, password });
  if (error) throw error;

  await findUserExists(email);

  const user = await User.create(payload);

  const result = createToken(user.id, user.email);
  
  return result;
};

module.exports = {
  createUser,
};
