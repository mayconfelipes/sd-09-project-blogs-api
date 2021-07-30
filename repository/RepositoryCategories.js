const { Op } = require('sequelize');
const { Category } = require('../models');

const create = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return newCategory.dataValues;
};

const getAll = async () => {
  const getAllCategories = await Category.findAll();

  return getAllCategories;
};

const findCategories = async (categoryIds) => {
  const getCategories = await Category.findAll({
    where: {
      id: {
        [Op.in]: categoryIds,
      },
    },
  });

  return getCategories;
};

module.exports = {
  create,
  getAll,
  findCategories,
};
