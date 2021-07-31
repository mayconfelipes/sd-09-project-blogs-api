const categorieService = require('../service/categories');

const createCategorie = async (req, res, _next) => {
  const { name } = req.body;
  const newCategorie = await categorieService.createNewCategorie(name);
  res.status(201).json(newCategorie);
};

module.exports = {
  createCategorie,
};
