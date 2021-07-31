const express = require('express');
const userControllers = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.post('/', userControllers.validateFields, userControllers.addUser);

module.exports = userRoutes;
