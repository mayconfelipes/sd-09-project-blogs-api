const jwt = require('jsonwebtoken');
const { User } = require('../models');

const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

const generateToken = async ({ id, displayName, email }) => {
  const token = jwt.sign({ id, displayName, email }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

const getByEmail = async (email) => User.findOne({ where: { email } });

module.exports = { generateToken, getByEmail };