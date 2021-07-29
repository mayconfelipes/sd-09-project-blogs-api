const express = require('express');
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/loginControllers');

const middlewares = require('../middlewares');
// Rotas de /user
const userRouter = express.Router();
// 1 - Sua aplicação deve ter o endpoint POST /user
userRouter.post('/', middlewares.validateUser, userController.postNewUser);

// 3 - Sua aplicação deve ter o endpoint GET /user
userRouter.get('/', middlewares.validateToken, userController.getAllUsers);

// 4 - Sua aplicação deve ter o endpoint GET /user/:id
userRouter.get('/:id', middlewares.validateToken, userController.getUserById);

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
