const rescue = require('express-rescue');
const CategorieService = require('../services/CategorieService');

const createCategorie = rescue(async (req, res) => {
  const { name } = req.body;

  const categorie = await CategorieService.createCategorie(name);

  return res.status(201).json(categorie);
});

const getAllCategorie = rescue(async (req, res) => {
  const categories = await CategorieService.getAllCategorie();

  return res.status(200).json(categories);
});

module.exports = {
  createCategorie,
  getAllCategorie,
};