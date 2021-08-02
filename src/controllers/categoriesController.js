const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const { body } = req;
    const newCategory = await categoryService.createCategory(body);

    return res.status(201).json(newCategory);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categoriesList = await categoryService.getAllCategories();

    return res.status(200).json(categoriesList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};