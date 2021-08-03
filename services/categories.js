const response = require('../helpers/response');
const { Category } = require('../models');

const create = async (name) => {
  if (!name) return response(400, '"name" is required');

  try {
    const category = await Category.create({ name });
    return {
      status: 201,
      category,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports = {
  create,
};