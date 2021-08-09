const Joi = require('joi');
const { User } = require('../models');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const responseCodes = {
  success: 200,
  created: 201,
  badRequest: 400,
  conflict: 409,
};

const errorMessages = {
  conflict: 'User already registered',
};

const getAllUsers = async () => (
  User.findAll({ attributes: { exclude: ['password'] } }));
const getUserById = async (id) => (User.findByPk(id));
const getUserByEmail = async (email) => (User.findOne({ where: { email } }));
const addUser = async (user) => {
  const { error } = userSchema.validate(user);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const userConflict = await getUserByEmail(user.email);
  if (userConflict) {
    const message = errorMessages.conflict;
    return { message: { message }, response: responseCodes.conflict };
  }
  const newUser = await User.create(user);
  return { newUser, response: responseCodes.created };
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
};
