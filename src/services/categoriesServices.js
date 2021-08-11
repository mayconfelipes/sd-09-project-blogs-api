const Joi = require('joi');
const { Category } = require('../models');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const getAllCategories = async () => (Category.findAll());
const getCategoryById = async (id) => (Category.findByPk(id));
const addCategory = async (categoryName) => {
  const { error } = categorySchema.validate(categoryName);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const category = await Category.create(categoryName);
  return { response: 201, message: category };
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
};