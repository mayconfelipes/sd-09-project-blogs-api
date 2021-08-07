const jwt = require('jsonwebtoken');
require('dotenv').config();

const config = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET;

const newToken = (payload) => jwt.sign(payload, secret, config);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  newToken,
  verifyToken,
};
