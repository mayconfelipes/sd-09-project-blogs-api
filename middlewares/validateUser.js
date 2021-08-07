const Joi = require('joi');

const userValidationSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const userValidation = (req, _res, next) => {
  const user = req.body;
  const { error } = userValidationSchema.validate(user);
  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    return next(err);
  }
  return next();
};

module.exports = userValidation;
