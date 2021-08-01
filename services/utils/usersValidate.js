const { User } = require('../../models');
const { BAD_REQUEST, CONFLICT } = require('../../utils/httpStatus');

const isValidDisplayName = (displayName) => {
  if (displayName.length < 8) {
    const error = { 
      type: BAD_REQUEST,
      message: '"displayName" length must be at least 8 characters long',
    };
    throw error;
  }
  return true;
};

const isValidEmail = async (email) => {
  if (!email) {
    const error = { type: BAD_REQUEST, message: '"email" is required' };
    throw error;
  }

  const isValidEmailFormat = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!isValidEmailFormat) {
    const error = { type: BAD_REQUEST, message: '"email" must be a valid email' };
    throw error;
  }

  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    const error = { type: CONFLICT, message: 'User already registered' };
    throw error;
  }
  return true;
};

const isValidPassword = (password) => {
  if (!password) {
    const error = { type: BAD_REQUEST, message: '"password" is required' };
    throw error;
  }

  if (password.length < 6) {
    const error = { type: BAD_REQUEST, message: '"password" length must be 6 characters long' };
    throw error;
  }
  return true;
};

const isValidFields = async (fields) => {
  isValidDisplayName(fields.displayName);
  await isValidEmail(fields.email);
  isValidPassword(fields.password);
};

module.exports = {
  isValidFields,
};