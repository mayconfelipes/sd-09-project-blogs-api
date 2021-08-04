const { Category } = require('../models');
const error = require('./error');

const createCategoryServ = async (categoryObj) => {
  console.log(categoryObj);
  const { name } = categoryObj;
  console.log(name);
  if (!name) return error.requiredName;
  const result = await Category.create(categoryObj);
  return result;
};

module.exports = {
  createCategoryServ,
};
