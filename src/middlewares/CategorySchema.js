const Joi = require('joi');
const CustomError = require('../utils/CustomError');

module.exports = (req, _res, next) => {
  try {
    const categoryData = req.body;
    const { error } = Joi.object({
      name: Joi.string().required().length(6),
    }).validate(categoryData);
    if (error) {
      throw new CustomError('invalidData', error.details[0].message);
    }
    next();
  } catch (err) {
    next(err);
  }
};
