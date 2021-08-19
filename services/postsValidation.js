const Joi = require('joi');
const { Category } = require('../models');

const validateCategory = Joi.object({
  name: Joi.string().required().messages({
    'string.required': '"name" is required',
  }),
});

const validatePostData = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()),
});

const isCategoryValid = async (category) => {
  const { error } = await validateCategory.validate(category);
  if (error) return { status: 400, message: error.message };
  return null;
};

const doesCategoriesExists = async (categories) => {
  if (!categories || categories === []) {
    return { status: 400, message: '"categoryIds" is required' };
  }

  const foundCategory = await Category.findAll({ where: { id: categories } });
  console.log(foundCategory);
  if (foundCategory.length === 0) {
    return { status: 400, message: '"categoryIds" not found' };
  }
    return null;
};

const isPostDataValid = async (data) => {
  const { error } = await validatePostData.validate(data);
  if (error) return { status: 400, message: error.message };
  
  return null;
};

module.exports = {
  isCategoryValid,
  isPostDataValid,
  doesCategoriesExists,
};
