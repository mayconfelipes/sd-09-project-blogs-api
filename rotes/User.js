const express = require('express');

const Router = express.Router();
const UserController = require('../controllers/UserController');

Router.post('/user', UserController.createUser);

module.exports = Router;