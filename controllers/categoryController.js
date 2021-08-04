const rescue = require('express-rescue');
const { createCategoryServ } = require('../services/categoryService');

const createCategory = rescue(async (req, res, next) => {
  const result = await createCategoryServ(req.body);
  if (result.status) return next(result);
  res.status(201).json(result);
});

module.exports = {
  createCategory,
};