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

module.exports = { create };