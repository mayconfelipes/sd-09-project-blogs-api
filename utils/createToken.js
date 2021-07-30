require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
    return token;
};

module.exports = { createToken };
