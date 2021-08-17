const jwt = require('jsonwebtoken');
const { codes, objectResponse } = require('./responseHandling');

require('dotenv').config();

const createToken = (user) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(user, secret, jwtConfig);
  
  return objectResponse({ token }, codes.CODE_200);
};

module.exports = { createToken };