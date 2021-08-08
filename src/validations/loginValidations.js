const { User } = require('../models');

const emailNotExists = {
  status: 400,
  error: {
    message: '"email" is required',
  },
};

const emptyEmail = {
  status: 400,
  error: {
    message: '"email" is not allowed to be empty',
  },
};

const passwordNotExists = {
  status: 400,
  error: {
    message: '"password" is required',
  },
};

const emptyPassword = {
  status: 400,
  error: {
    message: '"password" is not allowed to be empty',
  },
};

const invalidLogin = {
  status: 400,
  error: {
    message: 'Invalid fields',
  },
};

function validateEmail(email) {
  if (email === '') throw emptyEmail;
  if (!email) throw emailNotExists;
}

function validatePassword(password) {
  if (password === '') throw emptyPassword;
  if (!password) throw passwordNotExists;
}

async function validateLogin(email, password) {
  const userInfo = await User.findOne({ where: { email, password } });
  if (!userInfo) throw invalidLogin;
  delete userInfo.dataValues.password;
  return userInfo.dataValues;
}
module.exports = {
  validateEmail,
  validatePassword,
  validateLogin,
};
