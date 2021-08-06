const Joi = require('joi');

const UserSchema = Joi.object({
  email: Joi.string().email().not().empty()
.required(),
  password: Joi.string().not().empty().required(),
});

const loginValidate = (req, _res, next) => {
  const { error } = UserSchema.validate(req.body);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = loginValidate;
