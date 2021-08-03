const express = require('express');
const userController = require('../controllers/userController');

const route = express.Router();

route.post('/user', userController.createUser);

module.exports = route;