const express = require('express');
const { UsersController, LoginController } = require('../controllers');
const middlewareErro = require('../middlewares/error');

const route = express.Router();

route.use('/user', UsersController);
route.use('/login', LoginController);
route.use(middlewareErro);
module.exports = route;