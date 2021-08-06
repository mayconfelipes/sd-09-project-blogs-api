const jwt = require('jsonwebtoken');
require('dotenv/config');

const { User } = require('../models');
const { schema, validateError } = require('./schemas/loginSchema');
const { badRequest } = require('../helpers/getHttpStatusCode');
const filterUserData = require('../helpers/filterUserData');

const jwtConfig = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const { JWT_SECRET } = process.env;

const login = async (userData) => {
  const { email, password } = userData;

  const { error } = schema.validate(userData);
  if (error) throw validateError(badRequest, error.message);

  const user = await User.findOne({ where: { email, password } });

  if (!user) throw validateError(badRequest, 'Invalid fields');

  const data = filterUserData(user.dataValues);

  const token = jwt.sign(data, JWT_SECRET, jwtConfig);

  return token;
};

module.exports = { login };
