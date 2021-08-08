const Joi = require('joi');

const BAD_REQUEST = 400;

const catSchema = Joi.object().keys({
  name: Joi.string().not().empty()
    .required(),
});

const validateCategoryName = (req, res, next) => {
  const newCat = req.body;
  const { error } = catSchema.validate(newCat);
  if (error) {
    return res.status(BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = validateCategoryName;