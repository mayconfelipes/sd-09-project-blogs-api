const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.user, validate.userExists, userController.createUser);
route.get('/', validate.token, userController.getAllUsers);
route.get('/:id', validate.token, userController.getUserById);

module.exports = route;
