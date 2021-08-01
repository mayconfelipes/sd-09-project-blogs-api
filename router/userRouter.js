const express = require('express');
const controller = require('../Service/userService');

const userRouter = express.Router();

userRouter.post('/', controller.createUser);

module.exports = userRouter;