const categoryServices = require('../services/categoryServices');
const { created, ok } = require('../helpers/getHttpStatusCode');

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryServices.createCategory(req.body);
    return res.status(created).json(newCategory);
  } catch (err) {
    return next(err);
  }
};

const findCategories = async (req, res, next) => {
  try {
    const categories = await categoryServices.findCategories();
    res.status(ok).json(categories);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createCategory, findCategories };
