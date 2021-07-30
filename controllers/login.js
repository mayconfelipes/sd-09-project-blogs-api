const Joi = require('joi');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const loginServices = require('../services/login');
const { secret } = require('../middlewares/authorization');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

const login = [
  validate(loginSchema),
  rescue(async (req, res, next) => {
    const loginInfo = req.body;
    const user = await loginServices.login(loginInfo);

    if (user.error) return next(user.error);

    const token = jwt.sign(user, secret, jwtConfig);

    return res.status(200).json({ token });
  }),
];

module.exports = {
  login,
};
