const express = require('express');
const mdwUser = require('../middlewares/mdwUser');

const userRouter = express.Router();

userRouter.get('/', mdwUser.getAllUsers);

userRouter.post('/', mdwUser.userObjectValidator, mdwUser.postUser);

module.exports = userRouter;