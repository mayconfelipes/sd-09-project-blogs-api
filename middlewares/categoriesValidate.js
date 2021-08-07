const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().required(),
});

const categoriesValidate = (req, _res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = categoriesValidate;