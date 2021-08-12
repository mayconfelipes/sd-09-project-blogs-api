const express = require('express');
const { Category } = require('../models/index');
const { tokenValidation } = require('../middlewares');

const categoriesRouter = express.Router();

categoriesRouter.post('/', tokenValidation, (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).send({ message: '"name" is required' });

  Category.create({ name })
    .then(async () => {
      const category = await Category.findOne({ where: { name } });
      return res.status(201).send(category);
    })
    .catch((e) => res.status(301).send({ message: e.message }));
});

categoriesRouter.get('/', tokenValidation, (_req, res) => {
  Category.findAll()
    .then((categories) => res.status(200).send(categories))
    .catch((e) => res.status(404).send({ message: e.message }));
});

module.exports = categoriesRouter;