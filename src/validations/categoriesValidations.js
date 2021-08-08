const jwt = require('jsonwebtoken');

const privateKey = 'qualquercoisaaleatoria';

const MISSING_NAME = {
  status: 400,
  error: {
    message: '"name" is required',
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

function validateName(name) {
  if (!name) throw MISSING_NAME;
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

module.exports = {
  validateName,
  validateToken,
};
