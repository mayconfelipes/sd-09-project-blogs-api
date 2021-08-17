const Joi = require('joi');
const code = require('../utils/codes');

const ctgSchema = Joi.object().keys({
  name: Joi.string().not().empty()
    .required(),
});

const validateName = (req, res, next) => {
  const newCtg = req.body;
  const { error } = ctgSchema.validate(newCtg);

  if (error) {
    return res.status(code.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = validateName;