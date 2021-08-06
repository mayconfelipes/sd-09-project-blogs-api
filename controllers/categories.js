const { validateToken, validateNewCategorie } = require('../middlewares/validations');
const { categorie } = require('../services/categories');

const createCategorie = [
  validateToken,
  validateNewCategorie,
  async (req, res) => {
    const newCategorie = await categorie(req.body);
    return res.status(201).json(newCategorie);
  },
];

module.exports = { createCategorie };