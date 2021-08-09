const express = require('express');
const rescue = require('express-rescue');
const CategoryController = require('./categoryController');
const { validateCategory } = require('./categoryMiddleware');
const { validateToken } = require('../middlewares');

const usersRouter = express.Router();

usersRouter.post(
  '/categories',
  rescue(validateToken),
  rescue(validateCategory),
  rescue(CategoryController.create),
);

// usersRouter.get(
//   '/categories',
//   rescue(validateToken), 
//   rescue(UserController.getAll),
// );
// usersRouter.get(
//   '/categories',
//   rescue(validateToken), 
//   rescue(UserController.getById),
// );
// usersRouter.post(
//   '/categories',
//   rescue(validateLogin), 
//   rescue(UserController.login),
// );

module.exports = usersRouter;
