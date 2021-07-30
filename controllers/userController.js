const express = require('express');
const Joi = require('joi');

const rescue = require('express-rescue');
const userService = require('../services/userService');
const validate = require('../middlewares/validate');
const validateJWT = require('../api/auth/validateJWT');

const router = express.Router();

router.post('/user', [
  validate(Joi.object({
    displayName: Joi.string().min(8).not().empty(),
    email: Joi.string()
      .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i)
      .rule({ message: '"email" must be a valid email' })
      .required(),
    image: Joi.string().not().empty().required(),
    password: Joi.string().min(6)
      .rule({ message: '"password" length must be 6 characters long' })
      .required(),
  })),
  rescue(async (req, res, next) => {
    const user = await userService.createUser(req.body);

    if (user.error) {
      user.error.status = 409;
      return next(user.error);
    }

    return res.status(201).json(user);
  }),
]);

router.post('/login', [
  validate(Joi.object({
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  })),
  rescue(async (req, res, next) => {
    const token = await userService.login(req.body);

    if (token.error) {
      token.error.status = 400;
      return next(token.error);
    }

    return res.status(200).json(token);
  }),
]);

router.get('/user', [
  validateJWT,
  rescue(async (_req, res, _next) => {
    const users = await userService.getAll();
    return res.status(200).json(users);
  }),
]);

router.get('/user/:id', [
  validateJWT,
  rescue(async (req, res, next) => {
    const user = await userService.getById(req.params.id);

    if (user.error) {
      user.error.status = 404;
      return next(user.error);
    }

    return res.status(200).json(user);
  }),
]);

module.exports = router;