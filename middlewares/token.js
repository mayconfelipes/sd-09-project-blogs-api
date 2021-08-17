require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = (userData) => {
  console.log(secret);
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(userData, secret, jwtConfig);
};

// const validateToken = () => {

// };

module.exports = {
  generateToken,
  // validateToken,
};
