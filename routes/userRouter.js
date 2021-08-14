const express = require('express');
const { 
  checkDisplayName,
  checkEmail,
  checkPassword,
  checkIfUserEmailAlreadyExist,
  } = require('../middlewares/index');
const { newUser } = require('../controllers/user');

  const userRouter = express.Router();

  userRouter.post('/user', 
  checkDisplayName, 
  checkEmail,
  checkIfUserEmailAlreadyExist,
  checkPassword, newUser);

module.exports = { userRouter };
