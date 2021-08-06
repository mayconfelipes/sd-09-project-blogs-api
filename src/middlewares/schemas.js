const Joi = require('joi');
const err = require('./errors');

const userSchema = (req, _res, next) => {
  try {
    const userData = req.body;
    const { error } = Joi.object({
      displayName: Joi.string().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().length(6),
      image: Joi.string(),
    }).validate(userData);
    if (error) {
      console.log(error);
      throw err(error, 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userSchema,
};