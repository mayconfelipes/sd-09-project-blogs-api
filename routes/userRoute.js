const express = require('express');
const userController = require('../controllers/userController');
const {
  verifyEmail,
  validEmail,
  validDisplayName,
  validPassword,
  validToken,
} = require('../services/userService');

const router = express.Router();

router.post('/user',
validDisplayName, validPassword, verifyEmail, validEmail, userController.createUser);
router.get('/user', validToken, userController.findAllUsers);
router.get('/user/:id', validToken, userController.findUser);

module.exports = router;