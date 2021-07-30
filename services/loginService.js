const joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const verifyUserCredentials = (credentials) => (
  joi.object({
    email: joi.string().email().required(),
    password: joi.string().length(6).required(),
  }).validate(credentials)
);

const removePassword = (user) => {
  const { password, ...payload } = user;
  return payload;
};

const loginService = async (loginCredentials) => {
  const { error } = verifyUserCredentials(loginCredentials);
  if (error) {
    return error;
  }
  const { email, password } = loginCredentials;
  const user = await User.findOne({
    where: { email, password },
  });
  if (!user) {
    return ({
      statusCode: 400,
      message: 'Invalid fields',
    });
  }
  const payload = removePassword(user);
  const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
  const token = jwt.sign(payload, secret, jwtConfig);
  return { token };
};

module.exports = {
  loginService,
};
