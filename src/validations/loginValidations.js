const { User } = require('../models');

const EMAIL_NOT_EXIST = {
  status: 400,
  error: {
    message: '"email" is required',
  },
};

const EMPTY_EMAIL = {
  status: 400,
  error: {
    message: '"email" is not allowed to be empty',
  },
};

const PASSWORD_NOT_EXIST = {
  status: 400,
  error: {
    message: '"password" is required',
  },
};

const EMPTY_PASSWORD = {
  status: 400,
  error: {
    message: '"password" is not allowed to be empty',
  },
};

const INVALID_LOGIN = {
  status: 400,
  error: {
    message: 'Invalid fields',
  },
};

function validateEmail(email) {
  if (email === '') throw EMPTY_EMAIL;
  if (!email) throw EMAIL_NOT_EXIST;
}

function validatePassword(password) {
  if (password === '') throw EMPTY_PASSWORD;
  if (!password) throw PASSWORD_NOT_EXIST;
}

async function validateLogin(email, password) {
  const userInfo = await User.findOne({ where: { email, password } });
  if (!userInfo) throw INVALID_LOGIN;
  delete userInfo.dataValues.password;
  return userInfo.dataValues;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateLogin,
};
