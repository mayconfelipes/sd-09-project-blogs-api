const express = require('express');
const userController = require('../controllers/user');
const userService = require('../services/user');

const router = express.Router();

router.post(
  '/user',
  userService.validatesDisplayName,
  userService.validateEmail,
  userService.validateEmailFormat,
  userService.validatePassword,
  userService.validatePasswordLength,
  userService.emailAlreadyExists,
  userController.insertUser,
);

module.exports = router;