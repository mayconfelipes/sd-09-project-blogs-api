const ServiceCategories = require('../services/ServiceCategories');

const CREATED = 201;

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await ServiceCategories.create({ name });

    return res.status(CREATED).json(newCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};