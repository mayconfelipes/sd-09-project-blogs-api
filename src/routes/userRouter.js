const userRouter = require('express').Router();

const User = require('../controllers/user');

userRouter.post('/user', User.create);
userRouter.post('/login', User.login);
userRouter.get('/user', User.list);
userRouter.get('/user/:id', User.listById);
userRouter.delete('/user/me', User.exclude);

module.exports = userRouter;
