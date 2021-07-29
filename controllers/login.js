const express = require('express');

const loginRouter = express.Router();

const service = require('../services');

const { status, message } = service;

loginRouter.post('/', service.loginCheck, service.createToken,
  service.loginFindCheck, async (req, res) => {
    try {
      // console.log(req.token);
      const { token } = req;
      
      res.status(status.OK).json({ token });
    } catch (error) {
        res.status(status.SERVER_ERROR).json(message.serverError);
    }
  });

module.exports = loginRouter;