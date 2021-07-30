const Joi = require('joi');
const { User } = require('../models');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const create = async ({ displayName, email, password, image }) => {
  const { error } = userSchema.validate({ displayName, email, password });
  if (error) throw validateError(400, error.details[0].message);
  const userByEmail = await User.findOne({ where: { email } });
  if (userByEmail) throw validateError(409, 'User already registered');
  const idObject = await User.create({ displayName, email, password, image });
  return idObject;
};

const login = async ({ email, password }) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw validateError(401, error.details[0].message);
  const userByEmail = await User.findOne({ where: { email } });
  if (!userByEmail) throw validateError(400, 'Invalid fields');
  // const passwordValid = password === userByEmail[0].password;
  // if (!passwordValid) throw validateError(401, 'Incorrect username or password');
  const { id } = userByEmail.dataValues;
  return {
    id,
  };
};

const getAll = async () => {
  const users = await User.findAll();
  console.log(users, 'users');
  return users;
};

const getById = async (id) => {
  // const user = await User.findOne({ where: { id } });
  const user = await User.findByPk(id);
  if (!user) throw validateError(401, 'User does not exist');
  console.log(user);
  return user;
};

module.exports = {
  create,
  login,
  getAll,
  getById,
};