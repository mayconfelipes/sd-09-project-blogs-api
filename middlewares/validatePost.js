const Joi = require('joi');

const validatePost = async (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  validatePost,
};