const Joi = require('joi');

const { Categories } = require('../models');

const validateAuth = require('../middlewares/validateAuth');

// error
const objectError = (code, message) => ({
  code,
  message,
});

const validateDataCategories = (userWithoutImage) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate(userWithoutImage);

  if (error) {
    throw objectError('BAD_REQUEST', error.details[0].message);
  }
};

// create category
const create = async (authorization, data) => {
  await validateAuth(authorization);
  validateDataCategories(data);

  const categories = await Categories.create({ ...data });

  return categories;
};

// list all users
const list = async (authorization) => {
  await validateAuth(authorization);

  const categories = await Categories.findAll();

  return categories;
};

module.exports = {
  create,
  list,
};
