const Joi = require('joi');
const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const UserService = require('../services/user');

const createUser = [
  validate(Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  })),
  rescue(async (req, res, next) => {
    const { displayName, email, password, image } = req.body;

    const token = await UserService.createUser({ displayName, email, password, image });

    return token.error
      ? next(token.error)
      : res.status(201).json({ token });
  }),
];

const userLogin = [
  validate(Joi.object({
    email: Joi.string().empty().required(),
    password: Joi.string().empty().required(),
  })),
  rescue(async (req, res, next) => {
    const { email, password } = req.body;

    const token = await UserService.userLogin({ email, password });

    return token.error
      ? next(token.error)
      : res.status(200).json({ token });
  }),
];

module.exports = {
  createUser,
  userLogin,
};
