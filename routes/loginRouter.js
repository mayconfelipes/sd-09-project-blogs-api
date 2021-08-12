const express = require('express');
const { 
  tokenGenerator,
  checkEmail,
  checkPassword,
  checkIfLoginIsValid } = require('../middlewares');

const loginRouter = express.Router();

loginRouter.post('/', checkEmail, checkPassword, checkIfLoginIsValid, (req, res) => 
  res.status(200).send({ token: tokenGenerator(req.body) }));

module.exports = loginRouter;