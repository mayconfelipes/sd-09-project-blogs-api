const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateEmail = (email) => {
  const emailNull = {
    error: {
      code: 'emailRequired',
      message: '"email" is required',
    },
  };
  const emailEmpty = {
    error: {
      code: 'emailIsEmpty',
      message: '"email" is not allowed to be empty',
    },
  };
  if (email === undefined) throw emailNull;
  if (email.length === 0) throw emailEmpty;
};

const validatePassword = (password) => {
  const passwordNull = {
    error: {
      code: 'passwordRequired',
      message: '"password" is required',
    },
  };
  const passwordEmpty = {
    error: {
      code: 'passwordIsEmpty',
      message: '"password" is not allowed to be empty',
    },
  };
  if (password === undefined) throw passwordNull;
  if (password.length === 0) throw passwordEmpty;
};

const validateUser = async (email) => {
  const err = {
    error: {
      code: 'userInvalid',
      message: 'Invalid fields',
    },
  };
  const user = await User.findOne({ where: { email } });
  if (!user) throw err;
  return user;
};

const login = async (email, password) => {
  validateEmail(email);
  validatePassword(password);
  const user = await validateUser(email);
  delete user.dataValues.password;
  const token = jwt.sign({ userInfo: user.dataValues }, secret, jwtConfig);
  return token;
};

module.exports = {
  login,
};