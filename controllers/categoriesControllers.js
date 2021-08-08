const categoriesServices = require('../services/categoriesServices');

const created = 201;
const okay = 200;

const createNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await categoriesServices.createNewCategory({ name });
    return res.status(created).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const allCategories = await categoriesServices.getAllCategories();
    return res.status(okay).json(allCategories);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewCategory,
  getAllCategories,
};
