const Joi = require('joi');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;

const validPost = (req, _res, next) => {
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.array().not().empty().required(),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, BAD_REQUEST));

  next();
};

module.exports = validPost;