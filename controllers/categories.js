const categorieService = require('../service/categories');

const createCategorie = async (req, res, _next) => {
  const { name } = req.body;
  const newCategorie = await categorieService.createNewCategorie(name);
  res.status(201).json(newCategorie);
};

const getAllCategories = async (req, res, _next) => {
  const categories = await categorieService.getAll();
  res.status(200).json(categories);
};

module.exports = {
  createCategorie,
  getAllCategories,
};
