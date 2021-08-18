const express = require('express');
const userController = require('../controllers/userController');
const login = require('../controllers/login');

const router = express.Router();

router.post('/user', userController.userAdd);

router.post('/login', login);

module.exports = router;
