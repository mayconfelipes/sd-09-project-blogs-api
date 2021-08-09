const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const generateToken = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);

  return token;
};

module.exports = generateToken;
