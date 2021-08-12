const Joi = require('joi');

const code = require('../utils/codes');

const loginSchema = Joi.object().keys({
  email: Joi.string().not().empty().email()
    .required(),
  password: Joi.string().length(6).not().empty()
    .required(),
});

const checkLogin = (req, res, next) => {
  const user = req.body;
  const { error } = loginSchema.validate(user);

  if (error) {
    return res.status(code.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  return next();
};

module.exports = checkLogin;