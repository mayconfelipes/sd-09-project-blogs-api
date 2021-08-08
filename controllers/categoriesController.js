const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res, next) => {
  try {
    const category = req.body;
    const newCategory = await categoriesService.createCategory(category);
    return res.status(201).json(newCategory);
  } catch (err) { next(err); }
};

const getCategories = async (req, res, next) => {
  try {
    const categoriesList = await categoriesService.getCategories();
    return res.status(200).json(categoriesList);
  } catch (err) { next(err); }
};

module.exports = {
  createCategory,
  getCategories,
};
