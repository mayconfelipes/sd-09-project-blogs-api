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

module.exports = {
  create,
};
