const express = require('express');
const User = require('../controllers/user');
const Login = require('../controllers/login');
const Category = require('../controllers/category');

const router = express.Router();

router.use('/user', User);

router.use('/login', Login);

router.use('/categories', Category);

module.exports = router; 