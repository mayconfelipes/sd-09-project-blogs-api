const express = require('express');
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/loginControllers');

const middlewares = require('../middlewares');
// Rotas de /user
const userRouter = express.Router();
// 1 - Sua aplicação deve ter o endpoint POST /user
userRouter.post('/', middlewares.validateUser, userController.postNewUser);

// Rotas de /login
const loginRouter = express.Router();
// 2 - Sua aplicação deve ter o endpoint POST /login
loginRouter.post('/', middlewares.validateLogin, loginController.loginUser);

// Rotas de /categories
const categoriesRouter = express.Router();

// Rotas de /post
const postRouter = express.Router();

module.exports = {
  userRouter,
  loginRouter,
  categoriesRouter,
  postRouter,
};
