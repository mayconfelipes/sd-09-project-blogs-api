const Joi = require('joi');
const generateError = require('../auxiliarFunctions/generateError');

const validateCategory = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(generateError('badRequest', error.message));

  next();
};

module.exports = validateCategory;
