const categoriesService = require('../services/categoriesService');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await categoriesService.create(name);
    return res.status(201).json(category);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const categories = await categoriesService.getAll();
  return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
};
