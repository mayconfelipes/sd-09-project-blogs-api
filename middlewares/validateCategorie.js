const Joi = require('joi');

const validateCategorie = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate(req.body);
  if (error) next(error);
  return next();
};

module.exports = validateCategorie;
