const CategorieService = require('../Services/categorieService');

const addCategories = async (req, res, _next) => {
  const { authorization } = req.headers;
  const category = req.body;

  const newCategory = await CategorieService.addCategory(category, authorization);
  res.status(201).json(newCategory);
};

const getAllCategories = async (req, res, _next) => {
 const name = req.body;
 res.status(200).json(name);
};

module.exports = {
  addCategories,
  getAllCategories,
};