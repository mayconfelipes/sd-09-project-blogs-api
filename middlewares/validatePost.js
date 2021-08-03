const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const validatePost = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return next(error);

  next();
};

module.exports = validatePost;