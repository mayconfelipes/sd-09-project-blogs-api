const rescue = require('express-rescue');
const express = require('express');

const {
  createUserController,
  getAllUsersController,
} = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const userRouter = express.Router();

userRouter.post('/', validateUser, rescue(createUserController));
userRouter.get('/', validateToken, rescue(getAllUsersController));

module.exports = userRouter;