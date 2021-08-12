const express = require('express');
const rescue = require('express-rescue');

const { loginController } = require('../controllers/userController');
const checkLogin = require('../middlewares/checkLogin');

const loginRouter = express.Router();
// console.log('Login Router-----------------')

loginRouter.post('/', checkLogin, rescue(loginController));

module.exports = loginRouter;