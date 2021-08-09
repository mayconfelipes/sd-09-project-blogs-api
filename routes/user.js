const express = require('express');
const controllers = require('../controllers/user');

const user = express.Router();

user.post('/', controllers.newUser);

module.exports = user;
