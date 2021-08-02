const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return next(error);

  next();
};