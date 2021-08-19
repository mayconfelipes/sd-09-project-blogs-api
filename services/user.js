const jwt = require('jsonwebtoken');

const { User: UserModel } = require('../models');
const { newUserValidate, loginValidate } = require('../validation/user');
const Utils = require('../validation/throw');

const JWT_SECRET = 'senha';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const create = async (displayName, email, password, image) => {
    const { error } = newUserValidate.validate({ displayName, email, password });
    if (error) Utils.throwError(error, 400);

    const findUser = await UserModel.findOne({ where: { email } });
    if (findUser) Utils.throwError(new Error(), 409, 'User already registered');

    const newUser = await UserModel.create({ displayName, email, password, image });
    const { dataValues: { password: DBPass, ...OtherInfo } } = newUser;
    const token = jwt.sign(OtherInfo, JWT_SECRET, jwtConfig);
    return {
      token,
      statusCode: 201,
    };
};

const login = async (email, password) => {
  const { error } = loginValidate.validate({ email, password });
  if (error) Utils.throwError(error, 400);
  const user = await UserModel.findOne({ where: { email, password } });
  console.log(user);
  if (!user) Utils.throwError(new Error(), 400, 'Invalid fields');

  const { password: DBPass, ...otherInfo } = user;
  const token = jwt.sign(otherInfo, JWT_SECRET, jwtConfig);
  return { statusCode: 200, token };
};

module.exports = {
  create,
  login,
};