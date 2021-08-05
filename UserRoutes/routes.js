const express = require('express');

const userRouter = express.Router();
const UserController = require('../controllers/user');

userRouter.post('/user', UserController.createUserController);

module.exports = userRouter;