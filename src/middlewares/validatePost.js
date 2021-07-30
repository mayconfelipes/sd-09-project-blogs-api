const Joi = require('joi');
const generateError = require('../auxiliarFunctions/generateError');

const validatePost = (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.array().not().empty().required(),
  }).validate(req.body);

  if (error) return next(generateError('badRequest', error.message));

  next();
};

module.exports = validatePost;
