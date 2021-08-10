const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const error = require('../services/error');
const { User } = require('../models');

require('dotenv');

const SECRET = process.env.JWT_SECRET;
const isValidToken = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw error.tokenNotFound;
  // jwt.verify(authorization, SECRET);
  const extractToken = jwt.verify(authorization, SECRET);
  const user = await User.findOne({ where: { email: extractToken.email } });
  if (!user) return false;
  req.user = user.id;
  return next();
});

module.exports = {
  isValidToken,
};