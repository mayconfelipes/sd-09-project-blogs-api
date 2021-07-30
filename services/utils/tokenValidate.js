require('dotenv').config();
const jwt = require('jsonwebtoken');

const { UNAUTHORIZED } = require('../../utils/httpStatus');

const SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  const jwtConfig = { expiresIn: 86400, algorithm: 'HS256' };

  const { password, image, ...payload } = user;
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

const isValidToken = (authorization) => {
  if (!authorization) {
    const error = { type: UNAUTHORIZED, message: 'Token not found' };
    throw error;
  }

  try {
    jwt.verify(authorization, SECRET);
  } catch (error) {
    const err = { type: UNAUTHORIZED, message: 'Expired or invalid token' };
    throw err;
  }
};

module.exports = {
  generateToken,
  isValidToken,
};
