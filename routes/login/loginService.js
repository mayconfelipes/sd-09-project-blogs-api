const jwt = require('jsonwebtoken');

const userModel = require('../user/userModel');
const { validateLogin } = require('../../util/validations');
const { invalidFieldsError } = require('../../util/errorsMessages');

const secret = 'issoehsegredo';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = async (user) => {
  validateLogin(user);
  const userFound = await userModel.findUserByEmail(user.email);
  if (!userFound) throw invalidFieldsError;
  if (user.password !== userFound.password) throw invalidFieldsError;
  const { password, ...userWithoutPassword } = userFound;
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return { token };
};

module.exports = {
  login,
};
