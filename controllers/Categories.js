const rescue = require('express-rescue');
const Category = require('../services/Categories');

const createCategory = rescue(async (req, res, next) => {
  const { name } = req.body;

  const addCategory = await Category.createCategory(name);

  if (addCategory.message) return next(addCategory);
  console.log(addCategory);
  return res.status(201).json(addCategory);
});

module.exports = {
  createCategory,
};
