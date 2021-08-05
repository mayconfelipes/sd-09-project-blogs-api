const express = require('express');
const rescue = require('express-rescue');
const authorization = require('../middlewares/authorization');

const categoriesRouter = express.Router();
const categoriesService = require('../services/categoriesService');

categoriesRouter.post('/', authorization, rescue(async (req, res) => {
  const { name } = req.body;
  const category = await categoriesService.createCategory(name);
  return res.status(201).json(category);
}));

module.exports = categoriesRouter;