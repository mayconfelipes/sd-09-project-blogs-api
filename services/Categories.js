const { Category } = require('../models');

const nameIsRequired = {
  err: {
    status: 400,
    message: '"name" is required',
  },
};

const validateName = (name) => {
  if (!name) return nameIsRequired;
};

const createCategory = async (name) => {
  const validName = validateName(name);

  if (validName) return nameIsRequired.err;

  const category = await Category.create({ name });

  return category;
};

module.exports = {
  createCategory,
};
