const Joi = require('joi');

const validateCategory = (req, _res, next) => {
  const { name } = req.body;

  const userSchema = Joi.object({
    name: Joi.string().required(),
  });

  const userValidation = userSchema.validate({ name }); 

  if (userValidation.error) {
    return next(userValidation.error);
  }

  return next();
};

module.exports = validateCategory;
