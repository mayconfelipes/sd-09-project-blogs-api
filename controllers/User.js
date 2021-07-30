const Joi = require('joi');
require('dotenv').config();
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const validateJoi = require('../middlewares/validate');
const userService = require('../services/User');
const validateJWT = require('../middlewares/auth/validateJWT');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createUser = [
  validateJoi(
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

const login = [
  validateJoi(
    Joi.object({
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().length(6).required(),
    }),
  ),
  rescue(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.login(email, password);

    if (user.error) return next(user);

    const { password: pass, ...otherInfo } = user.dataValues;

    const token = jwt.sign({ data: otherInfo }, secret, jwtConfig);

    res.status(200).json({ token });
  }),
];

const getAllUsers = [
  validateJWT(userService.getAllUsers),
  async (req, res, _next) => {
    const results = await userService.getAllUsers();
  
    res.status(200).json(results);
  },
];

const getUserById = [
  validateJWT(userService.getAllUsers),
  rescue(async (req, res, next) => {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (user.error) return next(user);

    res.status(200).json(user);
  }),
];

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
};
