const express = require('express');
const controllers = require('../controllers/user');
const tokenValidate = require('../middlewares/tokenValidate');

const user = express.Router();

user.get('/:id', tokenValidate, controllers.getUserById);
user.get('/', tokenValidate, controllers.getUsers);
user.post('/', controllers.newUser);

module.exports = user;
