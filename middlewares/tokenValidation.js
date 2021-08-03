const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'tokensecreto';

const validateUserData = (code, message) => ({ code, message });

async function userValidate(req, _res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return next(validateUserData(401, 'Token not found'));
  }
  try {
    const payload = jwt.verify(token, secret);
    req.userId = payload.emailRegistered.id;
  } catch (err) {
    next(validateUserData(401, 'Expired or invalid token'));
  }
  next();
}

module.exports = {
  userValidate,
}; 