const { Category } = require('../models');
const categoriesValidations = require('../validations/categoriesValidations');

async function addCategory(name, token) {
  categoriesValidations.validateName(name);
  categoriesValidations.validateToken(token);
  const newCategory = await Category.create({ name });
  return { status: 201, response: newCategory.dataValues };
}

async function getCategories(token) {
  categoriesValidations.validateToken(token);
  const categories = await Category.findAll();
  const response = categories.map((category) => category.dataValues);
  return { status: 200, response };
}

module.exports = {
  addCategory,
  getCategories,
};
