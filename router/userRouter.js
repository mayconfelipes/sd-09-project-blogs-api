const express = require('express');
const userService = require('../service/userService');
const tokenService = require('../service/tokenService');

const userRouter = express.Router();

userRouter.post('/', userService.createUser);

userRouter.get('/', tokenService, userService.showAllUsers);

// busca usuario pela id
userRouter.get('/:id', tokenService, userService.findId);

module.exports = userRouter;