const express = require('express');
const joi = require('joi');

const { category } = require('../services');
const { auth } = require('../middlewares');

const router = express.Router();

const schema = joi.object({
  name: joi.string().required(),
});

router.post('/', auth, async (req, res, next) => {
  const { name } = req.body;

  const { error } = schema.validate({ name });

  if (error) return next(error);

  const newCategory = await category.createCategory({ name });

  res.status(201).json(newCategory);
});

router.get('/', auth, async (_req, res, _next) => {
  const categories = await category.readCategories();

  res.status(200).json(categories);
});

module.exports = router;
