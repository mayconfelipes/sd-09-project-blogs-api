const express = require('express');
const UserController = require('../controllers/usersController');

const route = express.Router();

route.use('/user', UserController);

module.exports = route;