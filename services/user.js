const Joi = require('joi');
const { Users } = require('../models');

const newUserSchema = Joi.object({
  displayName: Joi.string().min(8).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().uri().required(),
});

const checkNewUser = (params) => newUserSchema.validate(params);

const getUser = async (email) => {
  const user = await Users.findOne({ where: { email } });
  return user;
};

const createUser = async (user) => {
  const created = await Users.create(user);
  return created;
};

const findUsers = async () => {
  const users = await Users.findAll();
  return users;
};

const findUserById = async (id) => {
  const user = await Users.findByPk(id);
  return user;
};

module.exports = { checkNewUser, getUser, createUser, findUsers, findUserById };