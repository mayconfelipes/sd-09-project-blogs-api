const { Category } = require('../models');

const GetAllCategories = async (_req, res) => {
  const all = await Category.findAll();
  return res.status(200).json(all);
};

module.exports = GetAllCategories;
