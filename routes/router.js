const express = require('express');
const UserController = require('../controllers/userController');
const LoginController = require('../controllers/loginController');
const CategoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.use('/user', UserController);
router.use('/login', LoginController);
router.use('/categories', CategoriesController);

module.exports = router;