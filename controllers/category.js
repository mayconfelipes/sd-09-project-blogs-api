const Joi = require('joi');
const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const CategoryService = require('../services/category');
const validateJWT = require('../middlewares/validateJWS');

const createCategory = [
  validateJWT,
  validate(Joi.object({
    name: Joi.string().required(),
  })),
  rescue(async (req, res) => {
    const { name } = req.body;

    const newCategory = await CategoryService.createCategory({ name });

    return res.status(201).json(newCategory);
  }),
];

module.exports = {
  createCategory,
};
