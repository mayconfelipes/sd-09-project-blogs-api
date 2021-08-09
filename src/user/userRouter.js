const express = require('express');
const UserController = require('./userController');
// const validateAuth = require('../middlewares/validateAuth');
const { validateUser } = require('./userMiddleware');

const usersRouter = express.Router();

usersRouter.post('/user', validateUser, UserController.create);
// usersRouter.post('/login', validateLogin, UsersController.login);
// usersRouter.post('/users/admin', validateAuth, validateUser, UsersController.createAdmin);

module.exports = usersRouter;
