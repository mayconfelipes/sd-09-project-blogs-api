const express = require('express');

const userRouter = express.Router();

const verifyUserInfos = require('../middlewares/verifyUserInfos');
const validateJWT = require('../middlewares/validateJWT');

const {
  registerUserController,
  getAllUsersController,
  getUserByIdController,
  deleteSelfUserController,
} = require('../controllers/userController');

userRouter.post('/', [
  verifyUserInfos,
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
userRouter.delete('/me', [
  validateJWT,
  deleteSelfUserController,
]);

module.exports = userRouter;
