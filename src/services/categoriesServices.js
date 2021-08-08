const { Category } = require('../models');
const categoriesValidations = require('../validations/categoriesValidations');

async function addCategory(name, token) {
  categoriesValidations.validateName(name);
  categoriesValidations.validateToken(token);
  const newCategory = await Category.create({ name });
  return { status: 201, response: newCategory.dataValues };
}

module.exports = {
  addCategory,
};
