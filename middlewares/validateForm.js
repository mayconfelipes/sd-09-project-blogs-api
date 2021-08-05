const Joi = require('joi');
const { User } = require('../models');
const { code } = require('../helpers/messages');

const validateUserForm = (data) =>
  Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'any.required': '"displayName" is required',
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'any.required': '"email" is required',
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
      'any.required': '"password" is required',
    }),
    image: Joi.string(),
  }).validate(data);

const validateUserEmail = async ({ email }) => {
  const allUsers = await User.count({ where: { email } });
  if (allUsers !== 0) return true;  
};

const validateForm = async (req, res, next) => {
  const data = req.body;
  const { error } = validateUserForm(data);
  try {
    if (error) {
      const userInfoResponse = { code: 400, message: error.details[0].message };
      throw userInfoResponse;
    }
    next();
  } catch (err) {
    return res.status(code.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = { validateUserEmail, validateForm };
