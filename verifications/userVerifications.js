const { User } = require('../models');

const invalidFieldObject = (message) => ({ error: true, status: 400, message });

const displayNameVerification = (displayName) => {
  const message = '"displayName" length must be at least 8 characters long';
  if (displayName.length < 8) return invalidFieldObject(message);
  return { error: false };
};

const emailVerification = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const validateEmail = emailRegex.test(email);
  if (!email) return invalidFieldObject('"email" is required');
  if (!validateEmail) return invalidFieldObject('"email" must be a valid email');
  return { error: false };
};

const emailAlreadyExists = async (email) => {
  const theSameEmail = await User.findOne({
    where: { email },
  });
  if (!theSameEmail) {
    return { error: false };
  }
  return {
    error: true,
    status: 409,
    message: 'User already registered',
  };
};

const passwordVerification = (password) => {
  if (!password) return invalidFieldObject('"password" is required');
  if (password.length < 6) return invalidFieldObject('"password" length must be 6 characters long');
  return { error: false };
};

module.exports = {
  displayNameVerification,
  emailVerification,
  emailAlreadyExists,
  passwordVerification,
};
