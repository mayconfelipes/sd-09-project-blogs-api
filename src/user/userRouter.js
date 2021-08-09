const express = require('express');
const rescue = require('express-rescue');
const UserController = require('./userController');
const { validateUser, validateLogin } = require('./userMiddleware');
const { validateToken } = require('../middlewares');

const usersRouter = express.Router();

usersRouter.post(
  '/user',
  rescue(validateUser), 
  rescue(UserController.create),
);
usersRouter.get(
  '/user',
  rescue(validateToken), 
  rescue(UserController.getAll),
);
usersRouter.post(
  '/login',
  rescue(validateLogin), 
  rescue(UserController.login),
);

module.exports = usersRouter;
