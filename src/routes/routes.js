const express = require('express');
const UserController = require('../controllers/UsersController');
const middlewareErro = require('../middlewares/error');

const route = express.Router();

route.use('/user', UserController);
route.use(middlewareErro);
module.exports = route;