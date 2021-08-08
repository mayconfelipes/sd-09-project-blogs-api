const validator = require('validator');
const { User } = require('../models');

const invalidDisplayName = {
  status: 400,
  error: {
    message: '"displayName" length must be at least 8 characters long',
  },
};

const emailNotExists = {
  status: 400,
  error: {
    message: '"email" is required',
  },
};

const invalidEmail = {
  status: 400,
  error: {
    message: '"email" must be a valid email',
  },
};

const passwordNotExists = {
  status: 400,
  error: {
    message: '"password" is required',
  },
};

const invalidPassword = {
  status: 400,
  error: {
    message: '"password" length must be 6 characters long',
  },
};

const userAlreadyExists = {
  status: 409,
  error: {
    message: 'User already registered',
  },
};

function validateDisplayName(displayName) {
  if (displayName.length < 8) {
    throw invalidDisplayName;
  }
}

function validateEmail(email) {
  if (!email) {
    throw emailNotExists;
  }
  if (!validator.isEmail(email)) {
    throw invalidEmail;
  }
}

function validatePassword(password) {
  if (!password) {
    throw passwordNotExists;
  }
  if (password.length < 6) {
    throw invalidPassword;
  }
}

async function validateUserExists(email) {
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw userAlreadyExists;
  }
}

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateUserExists,
};
