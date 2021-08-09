require('dotenv');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '6000m',
  algorithm: 'HS256',
};

const createToken = (user) => {
  const { password: _, ...userWithoutPassword } = user;
  return jwt.sign(userWithoutPassword, JWT_SECRET, jwtConfig);
};
module.exports = { createToken };