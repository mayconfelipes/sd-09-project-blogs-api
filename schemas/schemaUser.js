const Joi = require('joi');

const httpRequestError = 400;

const userSchema = (body) => Joi.object({
  displayName: Joi.string().min(8).required()
    .error(new Error('"displayName" length must be at least 8 characters long')),
  email: Joi.string().email().required().messages({
    'string.min': '"email" must be a valid email',
    'any.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
    'any.required': '"password" is required',
  }),
  image: Joi.string().required(),
}).validate(body);

const validateUser = (req, res, next) => {
  const { error } = userSchema(req.body);
  if (error) return res.status(httpRequestError).json({ message: error.message });
  next();
};

module.exports = validateUser;
