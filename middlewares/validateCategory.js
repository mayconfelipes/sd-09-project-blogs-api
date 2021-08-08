const Joi = require('joi');

const categoryValidationSchema = Joi.object({
  name: Joi.string().required(),
});

const categoryValidation = (req, _res, next) => {
  const category = req.body;
  const { error } = categoryValidationSchema.validate(category);
  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    return next(err);
  }
  return next();
};

module.exports = categoryValidation;
