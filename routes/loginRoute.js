const express = require('express');
const loginController = require('../controllers/loginController');
const {
  verifyFields,
  verifyEmptyFields,
} = require('../services/loginService');

const router = express.Router();

router.post('/login', verifyEmptyFields, verifyFields, loginController.login);

module.exports = router;