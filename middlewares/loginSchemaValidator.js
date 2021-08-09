const Joi = require('joi');

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  const passwordLength = 6;

  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(passwordLength).required(),
  });

  const userValidation = userSchema.validate({ email, password }); 

  if (userValidation.error) {
    return next(userValidation.error);
  }

  return next();
};

module.exports = validateLogin;
