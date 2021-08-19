require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = (userData) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(userData, secret, jwtConfig);
};

const validateToken = (token) => {
  if (!token) return { status: 401, message: 'Token not found' };
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.email;
  } catch (err) {
    return { status: 401, message: 'Expired or invalid token' };
  }
};

module.exports = {
  generateToken,
  validateToken,
};
