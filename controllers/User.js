const Joi = require('joi');
require('dotenv').config();
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const validate = require('../middlewares/validate');
const userService = require('../services/User');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createUser = [
  validate(
    Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().length(6).required(),
      image: Joi.string().required(),
    }),
  ),
  rescue(async (req, res, next) => {
    const { displayName, email, password, image } = req.body;

    const newUser = await userService.createUser(displayName, email, password, image);
    
    if (newUser.error) return next(newUser);

    const { password: pass, ...otherInfo } = newUser.dataValues;

    const token = jwt.sign({ data: otherInfo }, secret, jwtConfig);

    res.status(201).json({ token });
  }),
];

module.exports = {
  createUser,
};
