const express = require('express');

const userRouter = express.Router();
const UserController = require('../controllers/user');
  const validateToken = require('../middlwares/validateToken');

userRouter.post('/user', UserController.createUserController);
userRouter.post('/login', UserController.loginUserController);
userRouter.get('/user', validateToken, UserController.listUsersController);
userRouter.get('/user/:id', validateToken, UserController.listUsersController);

module.exports = userRouter;