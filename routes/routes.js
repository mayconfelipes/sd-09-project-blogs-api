const express = require('express');
const userController = require('../controllers/userController');
const categoriesController = require('../controllers/categoriesController');
const login = require('../controllers/login');
const validateToken = require('../middlewares/validateToken');
const { 
  validateEmail, 
  validateUserExists, 
  validateDisplayName, 
  validatePassword } = require('../middlewares');

const router = express.Router();

router.get('/user', validateToken, userController.getAll);
router.get('/user/:id', validateToken, userController.getUser);
router.post('/user', 
  validateDisplayName, 
  validatePassword, 
  validateEmail, 
  validateUserExists, 
  userController.userAdd);

router.post('/login', 
  validatePassword, 
  validateEmail, 
  login);

router.post('/categories', validateToken, categoriesController.add);

module.exports = router;
