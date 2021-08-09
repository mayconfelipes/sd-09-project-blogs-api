const express = require('express');
const rescue = require('express-rescue');

const categoriesServices = require('../services/categoriesServices');
const validateCategory = require('../middlewares/categorySchemaValidator');
const validateJWT = require('../middlewares/validateJWT');
const { created, ok } = require('../utils/httpStatusCodes');

const categoriesController = express.Router();

categoriesController.post('/', validateJWT, validateCategory, rescue(async (req, res) => {
  const { name } = req.body;

  const category = await categoriesServices.create(name);

  return res.status(created).json(category);
}));

categoriesController.get('/', validateJWT, rescue(async (_req, res) => {
  const categories = await categoriesServices.getAll();

  return res.status(ok).json(categories);
}));

module.exports = categoriesController;
