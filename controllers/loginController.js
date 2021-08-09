const express = require('express');
const rescue = require('express-rescue');

const loginServices = require('../services/loginServices');
const loginValidator = require('../middlewares/loginSchemaValidator');
const { ok } = require('../utils/httpStatusCodes');

const loginController = express.Router();

loginController.post('/', loginValidator, rescue(async (req, res) => {
  const { email, password } = req.body;

  const token = await loginServices.login(email, password);

  return res.status(ok).json({ token });
}));

module.exports = loginController;
