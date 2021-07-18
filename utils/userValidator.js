const { User } = require('../models');
const isEmail = require('./isEmail');

const MIN_LENGTH = 8;
const PASSWORD_MIN_LENGTH = 6;

const displayNameValidator = (displayName) => {
  if (!displayName || displayName.length < MIN_LENGTH) {
    return {
      error: {
        code: 400,
        message: '"displayName" length must be at least 8 characters long',
      },
    };
  }
};

const emailValidator = (email) => {
  if (!email) {
    return {
      error: {
        code: 400,
        message: '"email" is required',
      },
    };
  }
  
  if (!isEmail(email)) {
    return {
      error: {
        code: 400,
        message: '"email" must be a valid email',
      },
    };
  }
};

const passwordValidator = (password) => {
  if (!password) {
    return {
      error: {
        code: 400,
        message: '"password" is required',
      },
    };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      error: {
        code: 400,
        message: '"password" length must be 6 characters long',
      },
    };
  }
};

const userFromDB = async (userEmail) => {
  const user = await User.findOne({ where: { email: userEmail } });
  if (user) {
  return {
      error: {
        code: 409,
        message: 'User already registered',
      },
    }; 
  }
  return user;
};

const userValidator = async (user) => {
  const displayNameValidation = displayNameValidator(user.displayName);
  const emailValidation = emailValidator(user.email);
  const passwordValidation = passwordValidator(user.password);
  if (displayNameValidation) return displayNameValidation;
  if (emailValidation) return emailValidation;
  if (passwordValidation) return passwordValidation;

  const findUserFromDB = await userFromDB(user.email);
  if (findUserFromDB) return findUserFromDB;
  return {
    displayName: user.displayName,
    email: user.email,
  };
};

module.exports = userValidator;