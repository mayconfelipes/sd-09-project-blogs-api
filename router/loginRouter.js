const express = require('express');

const loginService = require('../service/loginService');

const loginRouter = express.Router();

loginRouter.post('/', loginService.loginUser);

module.exports = loginRouter;