const { Router } = require('express');
const Auth = require('../middlewares/Auth');
const UserSchema = require('../middlewares/UserSchema');
const User = require('../services/User');

const UserRouter = Router();
const LoginRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;

UserRouter.post('/', UserSchema, async (req, res, next) => {
  try {
    const userData = req.body;
    const token = await User.create(userData);
    res.status(HTTP_CREATED).json({ token });
  } catch (err) {
    next(err);
  }
});

UserRouter.get('/', Auth, async (_req, res, next) => {
  try {
    const users = await User.getAll();
    res.status(HTTP_OK).json(users);
  } catch (err) {
    next(err);
  }
});

UserRouter.get('/:id', Auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    res.status(HTTP_OK).json(user);
  } catch (err) {
    next(err);
  }
});

LoginRouter.post('/', UserSchema, async (req, res, next) => {
  try {
    const userData = req.body;
    const token = await User.login(userData);
    res.status(HTTP_OK).json({ token });
  } catch (err) {
    next(err);
  }
});

UserRouter.delete('/me', Auth, async (req, res, next) => {
  try {
    const { id } = req.userData;
    await User.deleteById(id);
    res.status(HTTP_NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
});

module.exports = { UserRouter, LoginRouter };
