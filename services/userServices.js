const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
  image: Joi.string().required(),
});

const validateUserFormat = async (userData) => {
  const { error } = userSchema.validate(userData);
  if (error) return error.details[0].message;
  return true;
};

module.exports = {
  validateUserFormat,
};
