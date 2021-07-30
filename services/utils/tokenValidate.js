const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  const jwtConfig = { expiresIn: 86400, algorithm: 'HS256' };

  const { password, image, ...payload } = user;
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};
