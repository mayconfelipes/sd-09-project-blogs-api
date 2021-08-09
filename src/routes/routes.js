const express = require('express');
const {
  UsersController,
  LoginController,
  CategoryController,
  PostController,
} = require('../controllers');
const middlewareErro = require('../middlewares/error');

const route = express.Router();

route.use('/user', UsersController);
route.use('/login', LoginController);
route.use('/categories', CategoryController);
route.use('/post', PostController);
route.use(middlewareErro);
module.exports = route;