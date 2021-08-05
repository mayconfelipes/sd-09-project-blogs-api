const jwt = require('jsonwebtoken');
require('dotenv/config');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createToken = async (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const verifyToken = async (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  createToken,
  verifyToken,
};
