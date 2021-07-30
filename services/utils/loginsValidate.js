const { User } = require('../../models');
const { BAD_REQUEST } = require('../../utils/httpStatus');

const isValidEmail = async (email) => {
  if (email === '') {
    const error = { type: BAD_REQUEST, message: '"email" is not allowed to be empty' };
    throw error;
  }

  if (!email) {
    const error = { type: BAD_REQUEST, message: '"email" is required' };
    throw error;
  }

  const emailExists = await User.findOne({ where: { email } });
  if (!emailExists) {
    const error = { type: BAD_REQUEST, message: 'Invalid fields' };
    throw error;
  }
  return true;
};

const isValidPassword = (password) => {
  if (password === '') {
    const error = { type: BAD_REQUEST, message: '"password" is not allowed to be empty' };
    throw error;
  }

  if (!password) {
    const error = { type: BAD_REQUEST, message: '"password" is required' };
    throw error;
  }

  return true;
};

const isValidLogin = async (user) => {
  await isValidEmail(user.email);
  isValidPassword(user.password);
};

module.exports = {
  isValidLogin,
};