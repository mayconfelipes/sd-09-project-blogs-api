const { Category } = require('../models');
const { validateError } = require('./schemas/userSchema');
const { badRequest, conflict } = require('../helpers/getHttpStatusCode');

const createCategory = async (userData) => {
  const { name } = userData;

  if (!name) throw validateError(badRequest, '"name" is required');

  const category = await Category.findOne({ where: { name } });

  if (category) throw validateError(conflict, 'Category already registered');

  const newCategory = await Category.create(userData);

  return newCategory;
};

module.exports = { createCategory };
