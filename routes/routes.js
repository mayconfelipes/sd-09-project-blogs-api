const express = require('express');
const userController = require('../controllers/userController');
const categoriesController = require('../controllers/categoriesController');
const postController = require('../controllers/postController');
const login = require('../controllers/login');
const { 
  validateEmail, 
  validateUserExists, 
  validateDisplayName, 
  validatePassword,
  validatePostContent,
  validateCategory, 
  validateToken } = require('../middlewares');

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
router.get('/categories', validateToken, categoriesController.getAll);

router.post('/post', validateToken, validateCategory, validatePostContent, postController.add);
router.get('/post', validateToken, postController.getAll);

module.exports = router;
