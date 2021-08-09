const express = require('express');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.use('/user', userController);
router.use('/login', loginController);
router.use('/categories', categoriesController);

module.exports = router;