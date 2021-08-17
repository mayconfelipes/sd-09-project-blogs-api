const Joi = require('joi');

const { Users } = require('../models');
const createAuth = require('../middlewares/createAuth');

// validadores
const objectError = (code, message) => ({
  code,
  message,
});

const validateDataCreate = (userWithoutImage) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().length(6).required(),
  }).validate(userWithoutImage);

  if (error) {
    throw objectError('BAD_REQUEST', error.details[0].message);
  }
};

const validateDataLogin = (userWithoutImage) => {
  const { error } = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  }).validate(userWithoutImage);

  if (error) {
    throw objectError('BAD_REQUEST', error.details[0].message);
  }
};

const verifyEmailExists = async (type, email) => {
  const emailDB = await Users.findOne({ where: { email } });

  if (type === 'create' && emailDB) {
    throw objectError('CONFLICT', 'User already registered');
  }

  if (type !== 'create' && !emailDB) {
    throw objectError('BAD_REQUEST', 'Invalid fields');
  }

  return emailDB;
};

// create user
const create = async (data) => {
  const { image, ...userWithoutImage } = data;

  validateDataCreate(userWithoutImage);
  await verifyEmailExists('create', data.email);

  const users = await Users.create({ ...data });
  const { password, image: imageDB, ...userWithoutImagePassword } = users;

  const token = createAuth(userWithoutImagePassword);

  return { token };
};

// login
const login = async (data) => {
  validateDataLogin(data);

  const users = await verifyEmailExists('login', data.email);
  const { password, image, ...userWithoutImagePassword } = users;

  const token = createAuth(userWithoutImagePassword);

  return { token };
};

module.exports = {
  create,
  login,
};
