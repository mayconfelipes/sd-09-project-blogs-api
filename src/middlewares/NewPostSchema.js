const Joi = require('joi');
const CustomError = require('../utils/CustomError');

module.exports = (req, _res, next) => {
  try {
    const postData = req.body;
    const { error } = Joi.object({
      title: Joi.string().required().not().empty(),
      content: Joi.string().required().not().empty(),
      categoryIds: Joi.array().items(Joi.number().required()).required(),
    }).validate(postData);
    if (error) {
      throw new CustomError('invalidData', error.details[0].message);
    }
    next();
  } catch (err) {
    next(err);
  }
};
