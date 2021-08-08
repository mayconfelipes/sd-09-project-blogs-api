const { Category } = require('../models');
const schemas = require('../middlewares/schemas');

const create = async (categoryInfo) => {
  try {
    await schemas.categorySchema(categoryInfo);
  } catch (error) {
    return error;
  }
  const { id, name } = await 
  Category.create(categoryInfo);
  return {
    status: 201,
    id,
    name,
  };
};

const getAll = async () => {
  const categoryList = await Category.findAll();
  return {
    status: 200,
    categoryList,
  };
};

module.exports = { create, getAll };