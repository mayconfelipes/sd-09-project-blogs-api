const express = require('express');
const UsersService = require('../services/UsersServices');
const { HTTP_OK_STATUS } = require('../helpers/statusProtocoloHTTP');
const { validateDataLogin, validateLoginSucess } = require('../middlewares/validateLogin');

const routerLogin = express.Router();

routerLogin.post('/', validateDataLogin, validateLoginSucess, async (req, res, next) => {
  const { user } = req;
  try {
  const token = UsersService.createTokenForLogin(user);
  return res.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = routerLogin;