const joi = require('joi');
const { Category } = require('../models');
const { codes, objectError, objectResponse } = require('../util/responseHandling');

const categoryValidator = joi.object({
  name: joi.string().required(),
});

const createCategory = async (name) => {
  const { error } = categoryValidator.validate({ name });
  if (error) return objectError(error.details[0].message, codes.CODE_400);

  await Category.create({ name });

  const newCategory = await Category.findOne({ where: { name } });
  return objectResponse(newCategory, codes.CODE_201);
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return objectResponse(categories, codes.CODE_200);
};

module.exports = { createCategory, getAllCategories };