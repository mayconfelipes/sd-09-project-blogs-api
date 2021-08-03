const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
});

const validateCategorie = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return next(error);

  next();
};

module.exports = validateCategorie;