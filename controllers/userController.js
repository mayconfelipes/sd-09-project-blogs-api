const express = require('express');
const mdwUser = require('../middlewares/mdwUser');

const userRouter = express.Router();

userRouter.get('/', mdwUser.getAllUsers);

module.exports = userRouter;