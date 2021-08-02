const express = require('express');
const userService = require('../service/userService');

const userRouter = express.Router();

userRouter.post('/', userService.createUser);

module.exports = userRouter;