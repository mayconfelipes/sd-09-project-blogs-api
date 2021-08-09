require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign(data, process.env.JWT_SECRET, jwtOptions);

module.exports = {
  createToken,
};
