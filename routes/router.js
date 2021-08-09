const express = require('express');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.use('/user', userController);
router.use('/login', loginController);

module.exports = router;