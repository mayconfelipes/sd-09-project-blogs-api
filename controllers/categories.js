const Joi = require('joi');
const rescue = require('express-rescue');
const { validate } = require('../middlewares');
const categoryServices = require('../services/categories');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const create = [
  validate(categorySchema),
  rescue(async (req, res) => {
    const categoryInfo = req.body;
    const createdCategory = await categoryServices.create(categoryInfo);

    return res.status(201).json(createdCategory);
  }),
];

const getAll = rescue(async (_req, res) => {
  const categoriesList = await categoryServices.getAll();

  return res.status(200).json(categoriesList);
});

module.exports = {
  create,
  getAll,
};
