const Joi = require('joi');

const postsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
});

const validatePostFormat = async (userData) => {
  const { error } = postsSchema.validate(userData);
  if (error) return error.details[0].message;
  return true;
};

module.exports = {
  validatePostFormat,
};
