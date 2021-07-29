const express = require('express');

const loginRouter = express.Router();

const service = require('../services');

const { status, message } = service;

// REQ02-Login
loginRouter.post('/', service.loginCheck, service.createToken,
  service.loginFindCheck, async (req, res) => {
    try {
      // console.log(req.token);
      const { token } = req;
      
      return res.status(status.OK).json({ token });
    } catch (error) {
        console.log('ERRRRRROOOOOOOO CONTROLLLER LOGIN!!!!');
        console.log(error);
      return res.status(status.SERVER_ERROR).json(message.serverError);
    }
  });

module.exports = loginRouter;