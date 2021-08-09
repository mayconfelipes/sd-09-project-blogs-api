const express = require('express');
const { UsersController } = require('../controllers');
const middlewareErro = require('../middlewares/error');

const route = express.Router();

route.use('/user', UsersController);
route.use(middlewareErro);
module.exports = route;