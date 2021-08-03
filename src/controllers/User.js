const { Router } = require('express');
const UserSchema = require('../middlewares/UserSchema');
const User = require('../services/User');

const UserRouter = Router();
const LoginRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;

UserRouter.post('/', UserSchema, async (req, res, next) => {
  try {
    const userData = req.body;
    const token = await User.create(userData);
    res.status(HTTP_CREATED).json({ token });
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

module.exports = { UserRouter, LoginRouter };
