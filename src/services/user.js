const Joi = require('joi');
const { Users } = require('../models');

const newUserSchema = Joi.object({
  dislayName: Joi.string().min(8).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  image: Joi.string().uri().required(),
});

const checkNewUser = (params) => newUserSchema.validate(params);

const getUser = async (email) => Users.findOne({ where: { email } });

const createUser = async (user) => Users.create(user);

module.exports = { checkNewUser, getUser, createUser };