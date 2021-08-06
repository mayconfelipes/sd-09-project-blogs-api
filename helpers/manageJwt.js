const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwtConfig = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const { JWT_SECRET } = process.env;

const generateToken = (usersData) => {
  const token = jwt.sign(usersData, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = { generateToken };
