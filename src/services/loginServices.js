const jwt = require('jsonwebtoken');
const loginValidations = require('../validations/loginValidations');

const privateKey = 'qualquercoisaaleatoria';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

async function login(email, password) {
  loginValidations.validateEmail(email);
  loginValidations.validatePassword(password);
  const userInfo = await loginValidations.validateLogin(email, password);
  const token = jwt.sign({ data: userInfo }, privateKey, jwtConfig);
  return { status: 200, response: { token } };
}

module.exports = {
  login,
};
