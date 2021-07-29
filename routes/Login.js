const express = require('express');
const { validateLogin } = require('../middlewares/validations');
const loginController = require('../controllers/loginController');

const routerLogin = express.Router();

routerLogin.post('/', validateLogin, loginController.login);

module.exports = routerLogin;