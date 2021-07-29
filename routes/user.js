const express = require('express');
const UserController = require('../controllers/user');

const route = express.Router();

route.post('/', UserController.createUser);

module.exports = route;
