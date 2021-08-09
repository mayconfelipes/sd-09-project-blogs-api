const express = require('express');
const rescue = require('express-rescue');

const userServices = require('../services/userServices');
const validateUser = require('../middlewares/userSchemaValidator');
const validateJWT = require('../middlewares/validateJWT');
const { created, ok } = require('../utils/httpStatusCodes');

const userController = express.Router();

userController.post('/', validateUser, rescue(async (req, res) => {
  const { name, email, password, image } = req.body;

  const token = await userServices.create(name, email, password, image);

  return res.status(created).json({ token });
}));

userController.get('/', validateJWT, rescue(async (_req, res) => {
  const users = await userServices.getAll();

  return res.status(ok).json(users);
}));

module.exports = userController;
