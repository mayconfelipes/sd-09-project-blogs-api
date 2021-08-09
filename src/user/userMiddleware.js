const Joi = require('joi');

const validateUser = async (req, _res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  }).validate(req.body);
  if (error) return next(error);
  next();
};

// const validateLogin = async (req, _res, next) => {
//   const { error } = Joi.object({
//     email: Joi.required(),
//     password: Joi.required(),
//   }).validate(req.body);
//   if (error) return next({ error: 'emptyLoginFields' });
//   next();
// };

module.exports = {
  validateUser, 
  // validateLogin,
};
