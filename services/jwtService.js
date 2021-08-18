require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const SECRET = process.env.SECRET || 'secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const jwtSign = async (body) => {
  const token = jwt.sign({ data: body }, SECRET, jwtConfig);
  return token;
};

const jwtValidate = async (token) => {
  try {
    const decoded = await jwt.verify(token, SECRET);

    const existingUser = await User.findAll({
      where: { email: decoded.data.email },
    });

    if (existingUser.length === 0) {
      return { message: 'Expired or invalid token' };
    }

    return decoded;
  } catch (err) {
    console.error(err);
    return { message: 'Expired or invalid token' };
  }
};

module.exports = {
  jwtValidate,
  jwtSign,
};
