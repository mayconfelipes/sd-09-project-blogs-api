const express = require('express');

const Router = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require('../auth/tokenValidator');

Router.post('/user', UserController.createUser);
Router.get('/user', Auth.tokenValidator, UserController.getAllUsers);
Router.get('/user/:id', Auth.tokenValidator, UserController.getUserById);

module.exports = Router;