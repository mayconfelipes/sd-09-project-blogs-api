const Joi = require('joi');

const loginValidationSchema = Joi.object({
  email: Joi.string().email().empty()
    .required(),
  password: Joi.string().empty().required(),
});

const loginValidation = (req, _res, next) => {
  const login = req.body;
  const { error } = loginValidationSchema.validate(login);
  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    return next(err);
  }
  return next();
};

module.exports = loginValidation;