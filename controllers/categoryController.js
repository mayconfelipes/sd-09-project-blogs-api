const { categoryService } = require('../services');

const createCategory = async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await categoryService.postCategory(name);

  return newCategory.error
    ? next(newCategory)
    : res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const allCategories = await categoryService.getAllCategories();

  return res.json(allCategories);
};

module.exports = {
  createCategory,
  getAllCategories,
};
