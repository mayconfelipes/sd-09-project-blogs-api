require('dotenv');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const jwtConfig = {
  expiresIn: '6000m',
  algorithm: 'HS256',
};

module.exports = (user) => {
  const { password: _, ...userWithoutPassword } = user;
  return jwt.sign(userWithoutPassword, SECRET, jwtConfig);
};