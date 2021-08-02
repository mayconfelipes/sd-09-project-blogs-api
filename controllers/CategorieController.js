const rescue = require('express-rescue');
const Categorie = require('../services/CategorieService');

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const categorie = await Categorie.create(name);

  return res.status(201).json(categorie);
});

module.exports = {
  create,
};