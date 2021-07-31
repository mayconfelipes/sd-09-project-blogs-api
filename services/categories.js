const { Category } = require('../models');

const create = async (categoryInfo) => {
  const createdCategory = await Category.create(categoryInfo);
  return createdCategory.dataValues;
};

const getAll = async () => {
  const categoriesList = await Category.findAll();
  return categoriesList;
};

const getById = async (id) => {
  const foundCategory = await Category.findOne({ where: { id } });

  if (!foundCategory) {
    return {
      error: { statusCode: 400, message: '"categoryIds" not found' },
    };
  }

  return foundCategory.dataValues;
};

module.exports = {
  create,
  getAll,
  getById,
};
