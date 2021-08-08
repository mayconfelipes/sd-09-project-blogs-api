const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const userController = require('../controllers/userController');
const validateLogin = require('../middlewares/validateLogin');

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, rescue(userController.login));

module.exports = loginRouter;