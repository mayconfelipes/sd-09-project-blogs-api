const { Op } = require('sequelize');
const { Category } = require('../models');
const CustomError = require('./CustomError');

module.exports = async (categoryIds) => {
  const allCategories = await Category.findAll({
    where: { id: { [Op.in]: categoryIds } },
  });

  if (allCategories.length !== categoryIds.lenght) {
    throw new CustomError('"categoryIds" not found', 400);
  }
  return 'Categories ok';
};
