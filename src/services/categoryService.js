require('dotenv').config();
const Joi = require('joi');
const { Category } = require('../models');

const validateCategoyInfo = (data) =>
  Joi.object({
    name: Joi.string().required().messages({
      'any.required': '"name" is required',
    }),
  }).validate(data);

const createCategory = async (data) => {
  const { error } = validateCategoyInfo(data);

  if (error) {
    const categoryInfoResponse = { code: 400, message: error.details[0].message };
    throw categoryInfoResponse;
  }

  const newCategory = await Category.create(data);
  return newCategory;
};

const getAllCategories = async () => {
  const categoriesList = await Category.findAll();
  return categoriesList;
};

module.exports = {
  createCategory,
  getAllCategories,
};