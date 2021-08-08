const Joi = require('joi');

const BAD_REQUEST = 400;

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).not().empty()
    .required(),
  email: Joi.string().not().empty().email()
    .required(),
  password: Joi.string().length(6).not()
    .empty()
    .required(),
  image: Joi.string(),
});

const validateUserFields = (req, res, next) => {
  const newUser = req.body;
  const { error } = userSchema.validate(newUser);
  if (error) {
    return res.status(BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = validateUserFields;
