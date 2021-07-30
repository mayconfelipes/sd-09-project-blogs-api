const Joi = require('joi');
const { Categorie } = require('../models');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const create = async ({ name }) => {
  const { error } = categorySchema.validate({ name });
  if (error) throw validateError(400, error.details[0].message);
  const idObject = await Categorie.create({ name });
  return idObject;
};

const getAll = async () => {
  const categories = await Categorie.findAll();
  console.log(categories, 'users');
  return categories;
};

module.exports = {
  create,
  getAll,
};