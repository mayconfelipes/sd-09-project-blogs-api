const { Category } = require('../models');
const { CustomError, RequestValidator } = require('../middlewares');
const CategorySchema = require('../schemas/categorySchema');

const addCategory = async (categoryInfo) => {
  RequestValidator(CategorySchema, categoryInfo);
  try {
    const newCategory = await Category.create(categoryInfo);
    return newCategory;
  } catch (err) {
    throw new CustomError('Internal error server', 500);
  }
};

module.exports = {
  addCategory,
};
