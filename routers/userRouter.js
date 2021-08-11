const rescue = require('express-rescue');
const express = require('express');

const {
  createUserController,
} = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

const userRouter = express.Router();

userRouter.post('/', validateUser, rescue(createUserController));

module.exports = userRouter;