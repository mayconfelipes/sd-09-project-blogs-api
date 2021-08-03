const express = require('express');
const loginController = require('../controllers/loginController');

const route = express.Router();

route.post('/login', loginController.loginUser);

module.exports = route;
