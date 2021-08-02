const express = require('express');
const userControllers = require('../controllers/userController');
const loginValidate = require('../controllers/loginControllers');

const userRouters = express.Router();

userRouters.post('/', userControllers.validateFields, loginValidate.validateLogin);

module.exports = userRouters;
