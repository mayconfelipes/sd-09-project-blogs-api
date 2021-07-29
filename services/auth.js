const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');
const { status, message } = require('./statusMessages');

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status.UNAUTHORIEZED).json(message.tokenNotFound);
  }
  try {
   const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(tokenPayload);

  const { email } = tokenPayload;
  // console.log(email);

  const emailFind = await User.findOne({ where: { email } });

  if (!emailFind) {
    return res.status(status.UNAUTHORIEZED).json(message.serverError);
  }
  req.user = emailFind;
  // console.log(req.user);
  } catch (error) {
    return res.status(status.UNAUTHORIEZED).json(message.tokenExpired);
  }
  
  return next();
};

module.exports = { auth };