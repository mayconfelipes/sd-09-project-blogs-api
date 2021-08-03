const Joi = require('joi');
const rescue = require('express-rescue');
const { Category } = require('../models');
const validate = require('../middlewares/validate');

const create = [
  validate(Joi.object({ name: Joi.string().not().empty().required() })),
  rescue(async (req, res) => {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    
    return res.status(201).json(newCategory);
  }),
];

const findAll = rescue(async (_req, res) => {
  const categories = await Category.findAll();
  return res.status(200).json(categories);
});

module.exports = {
  create,
  findAll,
};