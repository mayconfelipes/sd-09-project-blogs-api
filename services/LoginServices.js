const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

const validateLoginFormat = async (userData) => {
  const { error } = loginSchema.validate(userData);
  if (error) return error.details[0].message;
  return true;
};

module.exports = {
  validateLoginFormat,
};
