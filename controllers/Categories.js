const { Category: CategoryModel } = require('../models');
const CategoryService = require('../services/Categories');

const STATUS_OK = 200;
const CREATED = 201;
const INTERNAL_ERROR = 500;

const addCategory = async (req, res) => {
  const categoryInfo = req.body;
  const newCategory = await CategoryService.addCategory(categoryInfo);
  return res.status(CREATED).json(newCategory);
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await CategoryModel.findAll();
    return res.status(STATUS_OK).json(allCategories);
  } catch (err) {
    return res.status(INTERNAL_ERROR).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
};
