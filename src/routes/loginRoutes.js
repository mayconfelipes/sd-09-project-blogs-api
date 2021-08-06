const express = require('express');
const rescue = require('express-rescue');
const { login } = require('../controllers/loginController');
const { validateLogin } = require('../middlewares/loginValidators');

const loginRoute = express.Router();

loginRoute.post('/', validateLogin, rescue(login));

module.exports = loginRoute;
