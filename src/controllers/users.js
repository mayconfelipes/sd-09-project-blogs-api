const Joi = require('joi');
const rescue = require('express-rescue');
const generateToken = require('../utils/generateTokenJwt');

const validate = require('../middlewares/validate');
const { User } = require('../models');
const UserService = require('../services/users');

const create = [
  validate(Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string().required(),
  })),
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const user = await UserService.createUser(displayName, email, password, image);
  
    if (user.error) return res.status(409).json(user.error);

    const token = generateToken(user);

    return res.status(201).json({ token });
  }),
];

const findAll = rescue(async (_req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
});

module.exports = {
  create,
  findAll,
  findById,
};