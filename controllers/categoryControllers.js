require('dotenv').config();
const Joi = require('joi');
const validate = require('../middlewares/validate');
const { Category } = require('../models');

module.exports = {
  validateField: validate(Joi.object({ name: Joi.string().required() })),

  addCategory: async (req, res, next) => {
    try {
      const { name } = req.body;

      const CategoryExists = await Category.findOne({ where: { name } });
      if (CategoryExists) return next({ statusCode: 400, message: 'Category exists' });

      const newCategory = await Category.create({ name });

      return res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
