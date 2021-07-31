const Joi = require('joi');

const validadePost = (req, res, next) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(req.body);

  if (error) next(error);

  next();
};

module.exports = validadePost;
