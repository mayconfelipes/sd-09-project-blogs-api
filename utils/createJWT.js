const jwt = require('jsonwebtoken');
require('dotenv/config');

const createJWT = (userData) => {
  const jwtConfig = {
    expiresIn: '2d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = createJWT;