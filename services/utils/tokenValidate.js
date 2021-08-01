require('dotenv').config();
const jwt = require('jsonwebtoken');

const { UNAUTHORIZED } = require('../../utils/httpStatus');

const SECRET = process.env.JWT_SECRET || 'segredo';

const generateToken = (userData) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const { email, id } = userData;
  const payload = { email, id };
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

const isValidToken = (authorization) => {
  if (!authorization) {
    const error = { type: UNAUTHORIZED, message: 'Token not found' };
    throw error;
  }

  try {
    const { id: userId } = jwt.verify(authorization, SECRET);
    return userId;
  } catch (error) {
    const err = { type: UNAUTHORIZED, message: 'Expired or invalid token' };
    throw err;
  }
};

module.exports = {
  generateToken,
  isValidToken,
};
