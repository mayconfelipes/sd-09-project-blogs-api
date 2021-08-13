const Joi = require('joi');
const { Categories } = require('../models');

const categorySchema = Joi.object({
  name: Joi.string().not().empty().required(),
});

const checkCategory = (body) => categorySchema.validate(body);

const getCategory = async (name) => {
  const category = await Categories.findOne({ where: { name } });
  return category;
};

const createCategory = async (category) => {
  const newCategory = await Categories.create(category);
  return newCategory;
};

module.exports = { checkCategory, getCategory, createCategory };
