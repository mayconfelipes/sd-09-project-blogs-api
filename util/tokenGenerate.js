const jwt = require('jsonwebtoken');
const { objectResponse } = require('./responseHandling');

require('dotenv').config();

const createToken = (user, code) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(user, secret, jwtConfig);
  
  return objectResponse({ token }, code);
};

module.exports = { createToken };