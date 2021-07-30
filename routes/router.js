const express = require('express');
const UserController = require('../controllers/userController');
const LoginController = require('../controllers/loginController');

const router = express.Router();

router.use('/user', UserController);
router.use('/login', LoginController);

module.exports = router;