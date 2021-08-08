const Joi = require('joi');
const { Category } = require('../models');

const validatePost = (post) =>
  Joi.object({
    title: Joi.string().required(),
    categoryIds: Joi.array().required(),
    content: Joi.string().required(),
  }).validate(post);

const validateAllCategories = async (categoryIds) => {
  const categories = await Category.findAll({});

  const exists = categoryIds.every((catId) => categories.some(({ id }) => catId === id));
  
  if (!exists) throw Error('"categoryIds" not found');
};

module.exports = async (post) => {
  const { error } = validatePost(post);

  if (error) {
    throw Error(error.details[0].message);
  }

  await validateAllCategories(post.categoryIds);
};
