const Joi = require('joi');

const postValidationSchema = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.array().required(),
  content: Joi.string().required(),
});

const postValidation = (req, _res, next) => {
  const post = req.body;
  const { error } = postValidationSchema.validate(post);
  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    return next(err);
  }
  return next();
};

module.exports = postValidation;
