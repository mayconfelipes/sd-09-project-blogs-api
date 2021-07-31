const joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { messageError } = require('../middwares/errors');
const {
  USER_REGISTERED,
  USER_NOT_CREATED,
  PASSWORD_SHORT,
  INVALID_FIELDS, 
  USER_NOT_EXIST } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS, 
  INTERNAL_ERROR_STATUS, 
  NOT_FOUND_STATUS } = require('../middwares/httpStatus');

const jwtConfig = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

require('dotenv').config();

const { JWT_SECRET } = process.env;

const userSchema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const validateUser = (user) => {
  const result = userSchema.validate(user);
  let errorMessage = PASSWORD_SHORT;

  if (result.error) {
    if (result.error.message !== '"password" length must be at least 6 characters long') {
      errorMessage = result.error.message;
    }

    throw messageError(BAD_REQUEST_STATUS, errorMessage);
  }
};

const validateLogin = (user) => {
  const result = loginSchema.validate(user);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const generateToken = (id, displayName, email) => {
  const jwtUser = {
    id,
    displayName,
    email,
  };

  const token = jwt.sign(jwtUser, JWT_SECRET, jwtConfig);

  return ({ token });
};

const getAll = async () => User.findAll();

const findByEmail = async (email) => User.findOne({ where: { email } });

const create = async (user) => {
  const { displayName, email, password, image } = user;
  const validateFields = {
    displayName,
    email,
    password,
  };

  validateUser(validateFields);

  const userExists = await findByEmail(email);

  if (userExists) {
    throw messageError(CONFLICT_STATUS, USER_REGISTERED);
  }

  const newUser = await User.create({ displayName, email, password, image });

  if (!newUser) {
    throw messageError(INTERNAL_ERROR_STATUS, USER_NOT_CREATED);
  }

  return generateToken(newUser.id, displayName, email);
};

const login = async (user) => {
  const { email } = user;

  validateLogin(user);

  const searchUser = await findByEmail(email);

  if (!searchUser) {
    throw messageError(BAD_REQUEST_STATUS, INVALID_FIELDS);
  }

  return generateToken(searchUser.id, searchUser.displayName, email);
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw messageError(NOT_FOUND_STATUS, USER_NOT_EXIST);
  }

  return user;
};

module.exports = {
  create,
  getAll,
  getById,
  login,
};
