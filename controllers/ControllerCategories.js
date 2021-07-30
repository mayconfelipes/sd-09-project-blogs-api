const ServiceCategories = require('../services/ServiceCategories');

const SUCCESS = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await ServiceCategories.create({ name });

    return res.status(CREATED).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllCategories = await ServiceCategories.getAll();

    return res.status(SUCCESS).json(getAllCategories);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
};