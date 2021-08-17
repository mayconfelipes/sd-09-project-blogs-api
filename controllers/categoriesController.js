const code = require('../utils/codes');
const {
  createCategoryService,
  getAllCategoriesService,
} = require('../services/categoriesService');

const createCategoryController = async (req, res) => {
  const newCat = req.body;
  const category = await createCategoryService(newCat);

  return res.status(code.CREATED).json(category);
};

const getAllcategoriesController = async (req, res) => {
  const categories = await getAllCategoriesService();

  return res.status(code.OK).json(categories);
};

module.exports = {
  createCategoryController,
  getAllcategoriesController,
};