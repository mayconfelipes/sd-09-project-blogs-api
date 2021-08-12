const express = require('express');
const userController = require('../controllers/user');
const userService = require('../services/user');
const helperValidateToken = require('../helpers/validateToken');

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

router.get(
  '/user',
  helperValidateToken,
  userController.listUsers,
);

module.exports = router;