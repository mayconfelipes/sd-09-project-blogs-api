const { createCategoryService } = require('../services/categoriesService');
const code = require('../utils/codes');

const createCategoryController = async (req, res) => {
  const newCat = req.body;
  const category = await createCategoryService(newCat);

  return res.status(code.CREATED).json(category);
};

module.exports = {
  createCategoryController,
};