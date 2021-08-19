const express = require('express');
const userController = require('../controllers/userController');
const login = require('../controllers/login');
const validateToken = require('../middlewares/validateToken');
const { 
  validateEmail, 
  validateUserExists, 
  validateDisplayName, 
  validatePassword } = require('../middlewares');

const router = express.Router();

router.post('/user', 
  validateDisplayName, 
  validatePassword, 
  validateEmail, 
  validateUserExists, 
  userController.userAdd);
router.get('/user', validateToken, userController.getAll);

router.post('/login', 
  validatePassword, 
  validateEmail, 
  login);

module.exports = router;
