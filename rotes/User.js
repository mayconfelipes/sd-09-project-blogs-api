const express = require('express');

const Router = express.Router();
const { createUser } = require('../controllers/UserController');

Router.post('/user', createUser);

module.exports = Router;