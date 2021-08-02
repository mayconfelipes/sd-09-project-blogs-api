const { Category } = require('../models');
const { isValidToken } = require('./utils/tokenValidate');
const { isValidName } = require('./utils/categoriesValidate');

const create = async (name, authorization) => {
  isValidName(name);
  isValidToken(authorization);
  const category = await Category.create({ name });
  const result = { id: category.dataValues.id, name: category.dataValues.name };
  return result;
};

const findAll = async (authorization) => {
  isValidToken(authorization);
  const category = await Category.findAll();
  const result = category;
  return result;
};

module.exports = {
  create,
  findAll,
};
