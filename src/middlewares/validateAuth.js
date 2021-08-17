require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

// error
const objectError = (code, message) => ({
  code,
  message,
});

module.exports = async (authorization) => {
  if (!authorization) {
    throw objectError('UNAUTHORIZED', 'Token not found');
  }

  try {
    const { payload } = jwt.verify(authorization, process.env.JWT_SECRET);

    const users = await Users.findOne({ where: { ...payload.email } });

    if (!users) {
      throw objectError('UNAUTHORIZED', 'Expired or invalid token');
    }

    return payload;
  } catch (error) {
    throw objectError('UNAUTHORIZED', 'Expired or invalid token');
  }
};
