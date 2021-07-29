const { Router } = require('express');

const { Categories } = require('../models');
const { categoriesValidation } = require('../middlewares/categoriesValidation.js');
const { validateToken } = require('../myToken/token.js');

const router = new Router();

// Criar categoria
router.post('/', categoriesValidation, validateToken, async (req, res) => {
  const { name } = req.body;

  const category = await Categories.create({ name });

  res.status(201).json({ ...category.dataValues, name });
});

// Listar todos as categoria
router.get('/', validateToken, async (_req, res) => {
  const categories = await Categories.findAll({});

  return res.status(200).json(categories);
});

module.exports = router;
