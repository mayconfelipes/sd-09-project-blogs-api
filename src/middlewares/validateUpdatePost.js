const Joi = require('joi');
const generateError = require('../auxiliarFunctions/generateError');

const validateUpdatePost = (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.forbidden().messages({
      'any.unknown': 'Categories cannot be edited',
    }),
  }).validate(req.body);
  if (error) return next(generateError('badRequest', error.message));

  next();
};

module.exports = validateUpdatePost;
