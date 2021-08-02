const { User } = require('../models');

const invalidDisplayName = {
   err: {
    status: 400,
    message: '"displayName" length must be at least 8 characters long',
   },
};

const invalidEmail = {
  err: {
    status: 400,
    message: '"email" must be a valid email',
  },
};

const requiredEmail = {
  err: {
    status: 400,
    message: '"email" is required',
  },
};

const invalidPassword = {
  err: {
    status: 400,
    message: '"password" length must be 6 characters long',
  },
};

const passwordIsRequired = {
  err: {
    status: 400,
    message: '"password" is required',
  },
};

const uniqueUser = {
  err: {
    status: 409,
    message: 'User already registered',
  },
};

// regex referência: https://ui.dev/validate-email-address-javascript/
const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateDisplayName = (displayName) => {
  if (displayName.length < 8) return invalidDisplayName;
};

const validateEmail = (email) => {
  if (!email) return requiredEmail;

  if (validFormat.test(email) === false) return invalidEmail;
};

const validatePassword = (password) => {
  if (!password) return passwordIsRequired;

  if (password.length < 6) return invalidPassword;
};

const createUser = async (displayName, email, password, image) => {
  const userName = validateDisplayName(displayName);
  const userEmail = validateEmail(email);
  const userPassword = validatePassword(password);

  if (userName) return userName.err;
  if (userEmail) return userEmail.err;
  if (userPassword) return userPassword.err;
  if (await User.findOne({ where: { email } })) return uniqueUser.err;

  const registerUser = await User.create({ displayName, email, password, image });

  return registerUser;
};

module.exports = {
  createUser,
};
