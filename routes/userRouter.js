const express = require('express');

const userRouter = express.Router();

const verifyEmailMiddleware = require('../middlewares/verifyEmailMiddleware');
const validateJWT = require('../middlewares/validateJWT');

const {
  registerUserController,
  getAllUsersController,
  getUserByIdController,
} = require('../controllers/userController');

userRouter.post('/', [
  verifyEmailMiddleware,
  registerUserController,
]);
userRouter.get('/', [
  validateJWT,
  getAllUsersController,
]);

userRouter.get('/:id', [
  validateJWT,
  getUserByIdController,
]);

module.exports = userRouter;
