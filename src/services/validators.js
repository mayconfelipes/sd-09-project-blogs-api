const { User } = require('../models');
const validator = require('validator');

const err = (message) => ({ message });

const validateDisplayName = (displayName) => {
  if (displayName.length < 8) throw err('"displayName" length must be at least 8 characters long');
};

const validateEmail = (email) => {
  if (email === undefined) throw err('"email" is required');
  if (validator.isEmpty(email)) throw err('"email" is not allowed to be empty');
  if (!validator.isEmail(email)) throw err('"email" must be a valid email');
};

const validatePassword = (password) => {
  if (password === undefined) throw err('"password" is required');
  if (validator.isEmpty(password)) throw err('"password" is not allowed to be empty');
  if (password.length < 6) throw err('"password" length must be 6 characters long');
};

const user = async ({ displayName, email, password }) => {
  try {
    validateDisplayName(displayName);
    validateEmail(email);
    validatePassword(password);
  } catch (err) {
    throw err;
  }
};

const userExists = async ({ email }) => {
  const userDB = await User.findOne({ email });
  if (userDB) throw err('User already registered');
};

const login = async ({ email, password }) => {
  validateEmail(email);
  validatePassword(password);
  const userDB = await User.findOne({ where: { email, password } });
  if (!userDB) throw err('Invalid fields');
};

module.exports = { user, userExists, login };
