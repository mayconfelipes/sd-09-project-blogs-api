require('dotenv/config');

const jwt = require('jsonwebtoken');
const { validateUserEmail } = require('../middlewares/validateForm');

const JWTConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const loginServices = async ({ email, password }) => {
  const emailExist = await validateUserEmail({ email, password });
  if (!emailExist) throw new Error('Invalid fields');
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, JWTConfig);
  return { token }; 
};

module.exports = loginServices;