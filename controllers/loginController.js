const express = require('express');

const rescue = require('express-rescue');
const loginService = require('../services/loginService');

const loginRouter = express.Router();

loginRouter.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await loginService.login(email, password);
  return res.status(200).json({ token });
}));

module.exports = loginRouter;