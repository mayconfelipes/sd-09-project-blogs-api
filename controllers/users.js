const Joi = require('joi');
const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const userServices = require('../services/users');

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

    return res.status(201).json(createdUser);
  }),
];

module.exports = {
  create,
};
