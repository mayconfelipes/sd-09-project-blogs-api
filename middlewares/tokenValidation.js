const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'tokensecreto';

const validateUserData = (code, message) => ({ code, message });

async function userValidate(req, _res, next) {
  const token = req.headers.authorization;
  console.log(secret);
  console.log(token);
  if (!token) {
    return next(validateUserData(401, 'Token not found'));
  }
  try {
    jwt.verify(token, secret);
  } catch (err) {
    next(validateUserData(401, 'Expired or invalid token'));
  }
  next();
}

module.exports = {
  userValidate,
}; 