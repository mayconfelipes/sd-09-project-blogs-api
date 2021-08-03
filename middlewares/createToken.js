require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = (user) => {
  const { password, ...userWhitoutPassword } = user;
  const token = jwt.sign(userWhitoutPassword, SECRET, jwtConfig);

  return token;
};