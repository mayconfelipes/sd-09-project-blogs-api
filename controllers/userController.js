const express = require('express');
const rescue = require('express-rescue');

const userServices = require('../services/userServices');
const validateUser = require('../middlewares/userSchemaValidator');
const { created } = require('../utils/httpStatusCodes');

const userController = express.Router();

userController.post('/', validateUser, rescue(async (req, res) => {
  const { name, email, password, image } = req.body;

  const token = await userServices.create(name, email, password, image);

  return res.status(created).json({ token });
}));

module.exports = userController;
