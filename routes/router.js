const express = require('express');
const User = require('../controllers/user');
const Login = require('../controllers/login');
const Category = require('../controllers/category');
const Post = require('../controllers/post');

const router = express.Router();

router.use('/user', User);

router.use('/login', Login);

router.use('/categories', Category);

router.use('/post', Post);

module.exports = router; 