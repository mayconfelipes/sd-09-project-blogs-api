const { Categories } = require('../models');
const { isValidToken } = require('./utils/tokenValidate');
const { isValidName } = require('./utils/categoriesValidate');

const create = async (name, authorization) => {
  isValidName(name);
  isValidToken(authorization);
  const category = await Categories.create({ name });
  const result = { id: category.dataValues.id, name: category.dataValues.name };
  return result;
};

module.exports = {
  create,
};
