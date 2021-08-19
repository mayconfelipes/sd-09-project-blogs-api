const Joi = require('joi');

const validateCategory = Joi.object({
  name: Joi.string().required().messages({
    'string.required': '"name" is required',
  }),
});

const isCategoryValid = async (category) => {
  const { error } = await validateCategory.validate(category);
  if (error) return { status: 400, message: error.message };
  return null;
};

module.exports = {
  isCategoryValid,
};
