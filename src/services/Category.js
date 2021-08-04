const { Category } = require('../models');

const findByName = async (name) => {
  const response = await Category.findOne({ where: { name } });

  return response;
};

const create = async (name) => {
  const existentCategory = await findByName(name);

  if (existentCategory) {
    return {
      err: {
        message: 'Category already registered',
      },
    };
  }

  const createdUser = await Category.create({ name });

  return createdUser;
};

module.exports = {
  create,
};
