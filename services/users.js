const joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { messageError } = require('../middwares/errors');
const { USER_REGISTERED, USER_NOT_CREATED, PASSWORD_SHORT } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS, 
  INTERNAL_ERROR_STATUS } = require('../middwares/httpStatus');

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

require('dotenv').config();

const { JWT_SECRET } = process.env;

const userSchema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
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

const generateToken = (id, displayName, email) => {
  const jwtUser = {
    id,
    displayName,
    email,
  };

  const token = jwt.sign(jwtUser, JWT_SECRET, jwtConfig);

  return ({ token });
};

const create = async (user) => {
  const { displayName, email, password, image } = user;
  const validateFields = {
    displayName,
    email,
    password,
  };

  validateUser(validateFields);

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    throw messageError(CONFLICT_STATUS, USER_REGISTERED);
  }

  const newUser = await User.create({ displayName, email, password, image });

  if (!newUser) {
    throw messageError(INTERNAL_ERROR_STATUS, USER_NOT_CREATED);
  }

  return generateToken(newUser.id, displayName, email);
};

module.exports = {
  create,
};
