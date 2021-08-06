const validator = require('validator');
const { User } = require('../models');

const error = (status, message) => ({ status, message });

const validateDisplayName = (displayName) => {
  if (!displayName) throw error(400, '"displayName" is required');
  if (displayName.length < 8) {
    throw error(400, '"displayName" length must be at least 8 characters long');
  }
};

const validateEmail = (email) => {
  if (!email) throw error(400, '"email" is required');
  if (!validator.isEmail(email)) throw error(400, '"email" must be a valid email');
};

const validatePassword = (password) => {
  if (!password) throw error(400, '"password" is required');
  if (password.length < 6) throw error(400, '"password" length must be 6 characters long');
};

const userExists = async (email) => {
  const exists = await User.findOne({ where: { email } });
  if (exists) throw error(409, 'User already registered');
};

const validateUser = async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  try {
    validateDisplayName(displayName);
    validateEmail(email);
    validatePassword(password);
    await userExists(email);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  validateUser,
};
