const express = require('express');
const userController = require('../controllers/user');

const route = express.Router();

route.post('/', userController.createNewUser);
route.get('/', userController.getUsers);

module.exports = route;