const Joi = require('joi');

const BAD_REQUEST = 400;

const loginSchema = Joi.object().keys({
  email: Joi.string().not().empty().email()
    .required(),
  password: Joi.string().min(6).not().empty()
    .required(),
});

const validateLogin = (req, res, next) => {
  const { user } = req.body;
  const { error } = loginSchema.validate(user);
  if (error) {
    return res.status(BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = validateLogin;