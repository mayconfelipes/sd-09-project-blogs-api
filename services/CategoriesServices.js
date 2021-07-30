const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const validateNameFormat = async (name) => {
  const { error } = categorySchema.validate(name);
  if (error) return error.details[0].message;
  return true;
};

module.exports = {
  validateNameFormat,
};