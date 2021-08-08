const validator = require('validator');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const privateKey = 'qualquercoisaaleatoria';

const INVALID_DISPLAY_NAME = {
  status: 400,
  error: {
    message: '"displayName" length must be at least 8 characters long',
  },
};

const EMAIL_NOT_EXISTS = {
  status: 400,
  error: {
    message: '"email" is required',
  },
};

const INVALID_EMAIL = {
  status: 400,
  error: {
    message: '"email" must be a valid email',
  },
};

const PASSWORD_NOT_EXISTS = {
  status: 400,
  error: {
    message: '"password" is required',
  },
};

const INVALID_PASSWORD = {
  status: 400,
  error: {
    message: '"password" length must be 6 characters long',
  },
};

const USER_ALREADY_EXISTS = {
  status: 409,
  error: {
    message: 'User already registered',
  },
};

const INVALID_TOKEN = {
  status: 401,
  error: {
    message: 'Expired or invalid token',
  },
};

const MISSING_AUTH = {
  status: 401,
  error: {
    message: 'Token not found',
  },
};

const USER_NOT_EXISTS = {
  status: 404,
  error: {
    message: 'User does not exist',
  },
};

function validateDisplayName(displayName) {
  if (displayName.length < 8) {
    throw INVALID_DISPLAY_NAME;
  }
}

function validateEmail(email) {
  if (!email) {
    throw EMAIL_NOT_EXISTS;
  }
  if (!validator.isEmail(email)) {
    throw INVALID_EMAIL;
  }
}

function validatePassword(password) {
  if (!password) {
    throw PASSWORD_NOT_EXISTS;
  }
  if (password.length < 6) {
    throw INVALID_PASSWORD;
  }
}

async function validateUserExists(email) {
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw USER_ALREADY_EXISTS;
  }
}

function validateToken(token) {
  if (!token) throw MISSING_AUTH;
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (err) {
    throw INVALID_TOKEN;
  }
}

function validateUser(user) {
  if (!user) throw USER_NOT_EXISTS;
}

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateUserExists,
  validateToken,
  validateUser,
};
