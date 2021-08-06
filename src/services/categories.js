const { Category } = require('../models');

const create = async (userInfo) => {
  const newCategory = await 
  Category.create(userInfo);
  return {
    status: 201,
    newCategory,
  };
};

module.exports = { create };