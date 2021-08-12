const rescue = require('express-rescue');
const express = require('express');

const {
  createUserController,
  getAllUsersController,
  getUserByIdController,
} = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const userRouter = express.Router();

userRouter.post('/', validateUser, rescue(createUserController));
userRouter.get('/', validateToken, rescue(getAllUsersController));
userRouter.get('/:id', validateToken, rescue(getUserByIdController));

module.exports = userRouter;