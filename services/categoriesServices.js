const { Category } = require('../models');

const create = async (name) => {
  const category = await Category.create({ name });

  return category;
};

module.exports = { 
  create,
};
