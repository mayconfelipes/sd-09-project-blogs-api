const express = require('express');
const User = require('../controllers/user');
const Login = require('../controllers/login');

const router = express.Router();

router.use('/user', User);

router.use('/login', Login);

module.exports = router; 