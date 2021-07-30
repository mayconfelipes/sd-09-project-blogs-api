const express = require('express');
const UserController = require('../controllers/userController');
const LoginController = require('../controllers/loginController');
const CategoriesController = require('../controllers/categoriesController');
const PostController = require('../controllers/postController');

const router = express.Router();

router.use('/user', UserController);
router.use('/login', LoginController);
router.use('/categories', CategoriesController);
router.use('/post', PostController);

module.exports = router;