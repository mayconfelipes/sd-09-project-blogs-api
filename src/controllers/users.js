const Joi = require('joi');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const validate = require('../middlewares/validate');
const UserService = require('../services/users');
// const { Product } = require('../models');

const { JWT_SECRET } = process.env;
const jwtConfig = { expiresIn: '3h', algorithm: 'HS256' };

const createUser = [
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

    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, JWT_SECRET, jwtConfig);
    return res.status(201).json({ token });
  }),
];

module.exports = {
  createUser,
};