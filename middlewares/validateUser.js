const Joi = require('joi');

const minCharacterName = 8;
const minCharacterPassword = 6;

const schema = Joi.object({
  displayName: Joi.string().min(minCharacterName).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(minCharacterPassword).required(),
  image: Joi.string().required(),
});

const validateUser = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return next(error);

  next();
};

module.exports = validateUser;