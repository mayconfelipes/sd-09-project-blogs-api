const Joi = require('joi');
const { Categorie } = require('../models');
const { errorHandling } = require('../utils');

const schemaCreateCategorie = Joi.object({
  name: Joi.required(),
});

const createCategorie = async (name) => {
  const { error } = schemaCreateCategorie.validate({ name });

  if (error) {
    throw errorHandling(400, error.details[0].message);
  }

  const newCategorie = await Categorie.create({ name });

  return newCategorie;
};

module.exports = {
  createCategorie,
};