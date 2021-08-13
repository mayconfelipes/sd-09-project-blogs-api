const categoryServices = require('../services/categoryServices');
const { created } = require('../helpers/getHttpStatusCode');

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryServices.createCategory(req.body);
    return res.status(created).json(newCategory);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createCategory };
