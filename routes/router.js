const express = require('express');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const categoriesController = require('../controllers/categoriesController');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.use('/user', userController);
router.use('/login', loginController);
router.use('/categories', categoriesController);
router.use('/post', postsController);

module.exports = router;