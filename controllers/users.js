const Joi = require('joi');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const validate = require('../middlewares/validate');
const userServices = require('../services/users');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const UserSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  image: Joi.string(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

const create = [
  validate(UserSchema),
  rescue(async (req, res, next) => {
    const userInfo = req.body;
    const createdUser = await userServices.create(userInfo);

    if (createdUser.error) return next(createdUser.error);

    const token = jwt.sign(createdUser.dataValues, secret, jwtConfig);

    return res.status(201).json({ token });
  }),
];

const getAll = rescue(async (_req, res) => {
  const usersList = await userServices.getAll();
  return res.status(200).json(usersList);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const foundUser = await userServices.getById(id);

  if (foundUser.error) return next(foundUser.error);

  return res.status(200).json(foundUser);
});

const remove = rescue(async (req, res) => {
  const { id } = req.user.dataValues;
  await userServices.remove(id);
  return res.status(204).end();
});

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
