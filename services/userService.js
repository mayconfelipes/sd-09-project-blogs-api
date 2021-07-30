require('dotenv').config();
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
const secret = process.env.JWT_SECRET;

const verifyUserInfos = (infos) => (
  joi.object({
    displayName: joi.string().min(8).required(),
    email: joi.string().email().required(),
    // email: joi.string().pattern(emailRegex).required(),
    password: joi.string().length(6).required(),
    image: joi.string().required(),
  }).validate(infos)
);

const registerUserService = async (userInfos) => {
  const { error } = verifyUserInfos(userInfos);
  if (error) {
    return { error };
  }
  // const { dataValues } = await User.create(userInfos);
  // const { password, ...payload } = dataValues;
  const registeredUser = await User.create(userInfos);
  const newUser = registeredUser.toJSON();
  const { password, ...payload } = newUser;
  const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
  const token = jwt.sign(payload, secret, jwtConfig);
  return { token };
};

const getAllUsersService = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

const getUserByIdService = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return ({
        statusCode: 404,
        message: 'User does not exist',
      });
    }
    return { response: user };
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

module.exports = {
  registerUserService,
  getAllUsersService,
  getUserByIdService,
};
