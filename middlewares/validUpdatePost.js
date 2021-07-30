const Joi = require('joi');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;

const validUpdatePost = (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.any().forbidden().messages({
      'any.unknown': 'Categories cannot be edited',
    }),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, BAD_REQUEST));

  next();
};

module.exports = validUpdatePost;