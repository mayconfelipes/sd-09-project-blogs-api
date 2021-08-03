const express = require('express');

const rescue = require('express-rescue');

const userRouter = express.Router();

const userService = require('../services/userService');

userRouter.post('/', rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await userService.createUser(displayName, email, password, image);
  return res.status(201).json({ token: newUser });
}));

// userRouter.get('/', rescue(async (req, res) => {
//   const 
// }));

module.exports = userRouter;