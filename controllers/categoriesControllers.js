const rescue = require('express-rescue');
// rescue substitui o try Catch
const services = require('../services/categoriesService');
const categoriesValidate = require('../middlewares/categoriesValidate');
const validateToken = require('../middlewares/validateToken');

const createCategories = [
  categoriesValidate,
  validateToken,
  rescue(async (req, res) => {
    const { name } = req.body;

    const category = await services.createCategories({ name });
    console.log('controllers', category);
    return res.status(201).json(category);
  }),
];

module.exports = {
  createCategories,
};