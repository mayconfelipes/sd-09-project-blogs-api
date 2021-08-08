const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const userController = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/', rescue(userController.login));

module.exports = loginRouter;