const categoriesService = require('../services/categoriesService');

const CREATED = 201;
const OK = 200;

const createCategory = async (req, res) => {
  const newCat = req.body;
  const category = await categoriesService.createCategory(newCat);
  return res.status(CREATED).json(category);
};

const getAllcategories = async (req, res) => {
  const categories = await categoriesService.getAllCategories();
  return res.status(OK).json(categories);
};

module.exports = {
  createCategory,
  getAllcategories,
};
