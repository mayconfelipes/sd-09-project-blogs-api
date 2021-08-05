const Joi = require('joi');
const { code } = require('../helpers/messages');

const validateLoginForm = (data) =>
  Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
    }),
  }).validate(data);

const validateLogin = async (req, res, next) => {
  const data = req.body;
  const { error } = validateLoginForm(data);
  try {
    if (error) {
      const loginResponse = { code: 400, message: error.details[0].message };
      throw loginResponse;
    }
    next();
  } catch (err) {
    return res.status(code.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = validateLogin;