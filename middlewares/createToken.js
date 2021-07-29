const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (userData) => {
  const token = jwt.sign(userData, secret, jwtConfig);

  return token;
};

module.exports = createToken;
