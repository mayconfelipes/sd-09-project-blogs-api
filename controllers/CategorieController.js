const rescue = require('express-rescue');
const Categorie = require('../services/CategorieService');

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const categorie = await Categorie.create(name);

  return res.status(201).json(categorie);
});

const getAll = async (_req, res) => {
  const categories = await Categorie.getAll();
  
  return res.status(200).json(categories)
}

module.exports = {
  create,
  getAll
};