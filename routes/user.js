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

router.get(
  '/user/:id',
  helperValidateToken,
  userController.userById,
);

/* coloquei a rota no route errado, corrigir depois */
router.delete(
  '/post/:id',
  helperValidateToken,
  userController.removePost,
);

router.delete(
  '/user/me',
  helperValidateToken,
  userController.removeUser,
);

module.exports = router;