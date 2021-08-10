const rescue = require('express-rescue');
const { 
  createCategoryServ,
  getAllCatServ,
} = require('../services/categoryService');

const createCategory = rescue(async (req, res, next) => {
  const result = await createCategoryServ(req.body);
  if (result.status) return next(result);
  res.status(201).json(result);
});

const getAllCategories = rescue(async (_req, res) => {
  const result = await getAllCatServ();
  return res.status(200).json(result);
});

module.exports = {
  createCategory,
  getAllCategories,
};