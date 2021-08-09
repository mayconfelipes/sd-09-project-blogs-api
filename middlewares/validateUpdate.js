const Joi = require('joi');

const BAD_REQUEST = 400;

const updateSchema = Joi.object().keys({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
});

const validateUpdate = (req, res, next) => {
  const newInfo = req.body;
  if (newInfo.categoryIds !== undefined) {
    return res.status(BAD_REQUEST).json({
      message: 'Categories cannot be edited',
    });
  }
  const { error } = updateSchema.validate(newInfo);
  if (error) {
    return res.status(BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = validateUpdate;