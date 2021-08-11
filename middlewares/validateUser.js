const Joi = require('joi');

const code = require('../utils/codes');

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

const validateUser = (req, res, next) => {
  const newUser = req.body;
  const { error } = userSchema.validate(newUser);

  if (error) {
    return res.status(code.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = validateUser;