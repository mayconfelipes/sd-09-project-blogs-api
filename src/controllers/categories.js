const Joi = require('joi');
const rescue = require('express-rescue');
const { Category } = require('../models');
const validate = require('../middlewares/validate');

const createCategory = [
  validate(Joi.object({ name: Joi.string().required() })),
  rescue(async (req, res) => {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    console.log(newCategory);
    return res.status(201).json(newCategory);
  }),
];

module.exports = {
  createCategory,
};