const rescue = require('express-rescue');

const {
  validateToken,
  validateNewCategory,
} = require('../middlewares/validations');
const categoriesServices = require('../services/categories');

const createCategory = [
  validateToken,
  validateNewCategory,
  rescue(async (req, res) => {
    const newCategorie = await categoriesServices.category(req.body);
    return res.status(201).json(newCategorie);
  }),
];

const getCategories = [
  validateToken,
  rescue(async (_req, res) => {
    const categories = await categoriesServices.findAllCategories();
    return res.status(200).json(categories);
  }),
];

module.exports = { createCategory, getCategories };
