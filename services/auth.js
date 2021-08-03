require('dotenv');

const jwt = require('jsonwebtoken');
const error = require('./error');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const generateToken = (email, password) => {
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const tokenNum = jwt.sign({ email, password }, SECRET, jwtConfig);
  return ({ token: tokenNum });
};

const isInvalidLogin = async (email, password) => {
  console.log(email, password);
  if (email === '') return error.emptyEmail;
  if (!email) return error.requiredEmail;
  if (password === '') return error.emptyPassword;
  if (!password) return error.requiredPassword;
  return null;
};

const validateToken = async (authorization) => {
  if (!authorization) throw error.tokenNotFound;
  // jwt.verify(authorization, SECRET);
  const extractToken = jwt.verify(authorization, SECRET);
  const userEmail = await User.findOne({ where: { email: extractToken.email } });
  if (userEmail) return true;
  return true;
  // if (!extractToken) throw error.expiredOrInvalidToken;
};

module.exports = {
  generateToken,
  isInvalidLogin,
  validateToken,
};
