const CategoryService = require('../services/Categories');

const CREATED = 201;

const addCategory = async (req, res) => {
  const categoryInfo = req.body;
  const newCategory = await CategoryService.addCategory(categoryInfo);
  return res.status(CREATED).json(newCategory);
};

module.exports = {
  addCategory,
};
