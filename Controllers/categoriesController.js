const rescue = require('express-rescue');
const CategorieService = require('../Services/categorieService');

const addCategories = rescue(async (req, res, _next) => {
  const newCategory = await CategorieService.addCategory(req.body);
  res.status(201).json(newCategory);
});

const getAllCategories = rescue(async (req, res, _next) => {
 const listCategories = await CategorieService.findAll();
 return res.status(200).json(listCategories);
});

module.exports = {
  addCategories,
  getAllCategories,
};