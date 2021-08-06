const categorieService = require('../services/categorieServices');

const createCategorie = (req, res) => categorieService.createCategorie(req.body)
.then(({ status, categorie }) => res.status(status).json({ categorie }));

const getAllCategories = (_req, res) => categorieService.getAllCategories()
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { createCategorie, getAllCategories };
