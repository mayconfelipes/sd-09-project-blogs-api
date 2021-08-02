const express = require('express');
const mdwLogin = require('../middlewares/mdwLogin');
const mdwUser = require('../middlewares/mdwUser');

const userRouter = express.Router();

userRouter.get('/', mdwLogin.tokenValidator, mdwUser.getAllUsers);
userRouter.get('/:id', mdwLogin.tokenValidator, mdwUser.getOneUser);
userRouter.post('/', mdwUser.userObjectValidator, mdwUser.postUser);
userRouter.delete('/me', mdwLogin.tokenValidator, mdwUser.deleteMe);

module.exports = userRouter;