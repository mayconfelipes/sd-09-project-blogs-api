const express = require('express');
const { 
  checkEmail,
  checkPassword,
  checkLogin,
  } = require('../middlewares/index');
const { login } = require('../controllers/login');

  const loginRouter = express.Router();

  loginRouter.post('/login',  
  checkEmail,
  checkPassword,
  checkLogin, login);

module.exports = { loginRouter };
