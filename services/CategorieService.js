// const jwt = require('jsonwebtoken');
// const Joi = require('@hapi/joi');
const { Categories } = require('../models');

// const secret = process.env.JWT_SECRET || 'tokensecreto';

const validateCategorieData = (code, message) => ({ code, message });

const create = async (name) => {
  try {
    const categorie = await Categories.create({ name });

    if (!name) throw Error;

    return categorie;
  } catch (_err) {
    throw validateCategorieData(400, '"name" is required');
  }
};

module.exports = {
  create,
};