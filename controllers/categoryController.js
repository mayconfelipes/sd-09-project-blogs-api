const {
  registerCategoryService,
  getAllCategoriesService,
} = require('../services/categoryService');

const registerCategoryController = async (req, res, next) => {
  const { body } = req;
  const result = await registerCategoryService(body);
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(201).json(response);
};

const getAllCategoriesController = async (_req, res, next) => {
  const result = await getAllCategoriesService();
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(200).json(response);
};

module.exports = {
  registerCategoryController,
  getAllCategoriesController,
};
