const express = require('express');
const { 
  checkDisplayName,
  checkEmail,
  checkPassword,
  checkIfUserEmailAlreadyExist,
  tokenValidation,
  } = require('../middlewares/index');
const { newUser, getAllUsers } = require('../controllers/user');

  const userRouter = express.Router();

  userRouter.post('/user', 
  checkDisplayName, 
  checkEmail,
  checkIfUserEmailAlreadyExist,
  checkPassword, newUser);

  userRouter.get('/user', tokenValidation, getAllUsers);

module.exports = { userRouter };
