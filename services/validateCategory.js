const Joi = require('joi');

const validateCategory = (category) =>
  Joi.object({
    name: Joi.string().required(),
  }).validate(category);

module.exports = async (category) => {
  const { error } = validateCategory(category);

  if (error) {
    throw Error(error.details[0].message);
  }
};
