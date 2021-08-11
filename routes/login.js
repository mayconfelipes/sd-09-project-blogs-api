const express = require('express');
const loginController = require('../controllers/login');
const loginService = require('../services/login');

const router = express.Router();

router.post(
  '/login',
  loginService.emailIsNotNull,
  loginService.validateEmail,
  loginService.passwordIsNotNull,
  loginService.validatePassword,
  loginController.login,
);

module.exports = router;