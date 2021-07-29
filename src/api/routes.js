const express = require('express');
const userController = require('../controllers/userControllers');
const middlewares = require('../middlewares');
// Rotas de /user
const userRouter = express.Router();
userRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Estamos no GET userRouter',
  });
});

// 1 - Sua aplicação deve ter o endpoint POST /user
userRouter.post('/', middlewares.validateUser, userController.postNewUser);

// Rotas de /login
const loginRouter = express.Router();
loginRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Estamos no GET loginRouter',
  });
});

// Rotas de /categories
const categoriesRouter = express.Router();
categoriesRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Estamos no GET categoriesRouter',
  });
});

// Rotas de /post
const postRouter = express.Router();
postRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Estamos no GET postRouter',
  });
});

module.exports = {
  userRouter,
  loginRouter,
  categoriesRouter,
  postRouter,
};
