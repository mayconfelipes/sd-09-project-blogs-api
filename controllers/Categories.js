const Joi = require('joi');
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validate');
const validateJWT = require('../middlewares/auth/validateJWT');
const categorieService = require('../services/Categories');
const userService = require('../services/User');

const createCategorie = [
  validateJoi(
    Joi.object({
      name: Joi.string().not().empty().required(),
    }),
  ),
  validateJWT(userService.getAllUsers),
  rescue(async (req, res, _next) => {
    const { name } = req.body;
    const categorie = await categorieService.createCategorie(name);

    res.status(201).json(categorie);
  }),
];

const getAllCategories = [
  validateJWT(userService.getAllUsers),
  rescue(async (req, res, _next) => {
    const results = await categorieService.getCategories();

    res.status(200).json(results);
  }),
];

module.exports = {
  createCategorie,
  getAllCategories,
};
