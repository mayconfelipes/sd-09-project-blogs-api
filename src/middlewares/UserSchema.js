const Joi = require('joi');
const CustomError = require('../utils/CustomError');

module.exports = (req, _res, next) => {
  try {
    const userData = req.body;
    const { error } = Joi.object({
      displayName: Joi.string().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().length(6),
      image: Joi.string(),
    }).validate(userData);
    if (error) {
      throw new CustomError('invalidData', error.details[0].message);
    }
    next();
  } catch (err) {
    next(err);
  }
};
