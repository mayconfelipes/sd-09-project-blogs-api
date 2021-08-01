const express = require('express');
const userController = require('../controllers/user');

const route = express.Router();

route.post('/', userController.createNewUser);
route.get('/', userController.getUsers);
route.get('/:id', userController.getUserById);

module.exports = route;