const express = require('express');
const usersController = require('../controllers/usersController');

const userRouter = express.Router();

userRouter.post('/', usersController.createUser);

module.exports = userRouter;