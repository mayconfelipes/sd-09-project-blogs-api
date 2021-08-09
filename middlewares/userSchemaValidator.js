const Joi = require('joi');

const validateUser = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const nameMinLength = 8;
  const passwordLength = 6;

  const userSchema = Joi.object({
    displayName: Joi.string().min(nameMinLength).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(passwordLength).required(),
  });

  const userValidation = userSchema.validate({ displayName, email, password }); 

  if (userValidation.error) {
    return next(userValidation.error);
  }

  return next();
};

module.exports = validateUser;
