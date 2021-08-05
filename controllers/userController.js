const express = require('express');

const rescue = require('express-rescue');

const userRouter = express.Router();

const userService = require('../services/userService');

const authorization = require('../middlewares/authorization');

userRouter.post('/', rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await userService.createUser(displayName, email, password, image);
  return res.status(201).json({ token: newUser });
}));

userRouter.get('/', authorization, async (req, res) => {
  const listAllUsers = await userService.listAll();
  return res.status(200).json(listAllUsers);
});

module.exports = userRouter;