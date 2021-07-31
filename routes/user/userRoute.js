const express = require('express');
const rescue = require('express-rescue');
const validateToken = require('../middlewares/validateToken');

const userController = require('./userController');

const userRouter = express.Router();

userRouter.post('/', rescue(userController.createUser));
userRouter.get('/', rescue(validateToken), rescue(userController.allUsers));
userRouter.get('/:id', rescue(validateToken), rescue(userController.findUserById));
userRouter.delete('/me', rescue(validateToken), rescue(userController.deleteUserMe));

module.exports = userRouter;
