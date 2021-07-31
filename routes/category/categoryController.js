const categoryService = require('./categoryService');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;

const createCategory = async (req, res, _next) => {
  const category = req.body;
  const result = await categoryService.createCategory(category);
  res.status(HTTP_STATUS_CREATED).json(result);
};

const allCategories = async (_req, res, _next) => {
  const result = await categoryService.allCategories();
  res.status(HTTP_STATUS_OK).json(result);
};

module.exports = {
  createCategory,
  allCategories,
};
