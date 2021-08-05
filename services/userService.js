const jwt = require('jsonwebtoken');
const status = require('../status/status');
const { User } = require('../models');

const DN_LENGTH = 8;
const MIN_LENGTH = 6;
const secret = 'parangaricotirimirruaro';

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /\S+@\S+\.\S+/;
  if (!email || email === '') {
    return res.status(status.BAD_REQUEST).json({ message: '"email" is required' });
  }
  if (!regexEmail.test(email)) {
    return res.status(status.BAD_REQUEST).json({ message: '"email" must be a valid email' });
  }  
  next();
};

const validEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailExist = await User.findOne({ where: { email } });
  if (emailExist != null) {
    return res.status(status.CONFLICT).json({ message: status.CONFLICT_MESSAGE });
  }
  next();
};

const validDisplayName = async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < DN_LENGTH) {
    return res.status(status.BAD_REQUEST)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(status.BAD_REQUEST).json({ message: '"password" is required' });
  }
  if (password.length < MIN_LENGTH) {
    return res.status(status.BAD_REQUEST)
    .json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const validToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    if (!decoded) {
      return res.status(status.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    }
  } catch (err) {
    console.log(err);
    return res.status(status.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  verifyEmail,
  validEmail,
  validDisplayName,
  validPassword,
  validToken,
};