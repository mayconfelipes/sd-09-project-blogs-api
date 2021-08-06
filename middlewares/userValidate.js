const Joi = require('joi');

const UserSchema = Joi.object({
  displayName: Joi.string().min(8).not().empty()
  .required(),
  password: Joi.string().length(6).not().empty()
  .required(),
  email: Joi.string().email().required(),
  image: Joi.string(),
});

const userValidate = (req, _res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
      // details é array que contém a message
    });
  }
  next();
};

module.exports = userValidate;