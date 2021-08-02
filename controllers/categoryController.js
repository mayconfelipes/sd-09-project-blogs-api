const { categoryService } = require('../services');

const createCategory = async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await categoryService.postCategory(name);

  return newCategory.error
    ? next(newCategory)
    : res.status(201).json(newCategory);
};

module.exports = {
  createCategory,
};
