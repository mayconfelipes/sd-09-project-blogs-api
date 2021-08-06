const rescue = require('express-rescue');

const {
  validateToken,
  validateNewCategorie,
} = require('../middlewares/validations');
const categoriesServices = require('../services/categories');

const createCategorie = [
  validateToken,
  validateNewCategorie,
  rescue(async (req, res) => {
    const newCategorie = await categoriesServices.categorie(req.body);
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

module.exports = { createCategorie, getCategories };
