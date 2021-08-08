const Schema = require('../Utils/schemas');
const ValidateError = require('../Utils/validateError');
const { Category } = require('../models');

const addCategory = async (category) => {
  const { error } = Schema.category.validate(category);
  if (error) throw ValidateError(400, error.message);

  await Category.create(category);
  return category;
};

module.exports = { addCategory };