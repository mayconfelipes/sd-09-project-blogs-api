require('dotenv').config();
const Joi = require('joi');
const validate = require('../middlewares/validate');
const { Categories } = require('../models');

module.exports = {
  validateField: validate(Joi.object({ name: Joi.string().required() })),

  addCategory: async (req, res, next) => {
    try {
      const { name } = req.body;

      const CategoryExists = await Categories.findOne({ where: { name } });
      if (CategoryExists) return next({ statusCode: 400, message: 'Category exists' });

      const newCategory = await Categories.create({ name });

      return res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  listAllCategories: async (_req, res, _next) => {
    try {
      const listCategories = await Categories.findAll();

      res.status(200).json(listCategories);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
