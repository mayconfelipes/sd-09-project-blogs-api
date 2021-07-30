const Joi = require('joi');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;

const validCategory = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, BAD_REQUEST));

  next();
};

module.exports = validCategory;