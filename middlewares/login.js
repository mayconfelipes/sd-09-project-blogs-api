const Joi = require('joi');
// const { User } = require('../models');
const { BADREQUEST } = require('../ultils');

const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .empty()
      .min(6),
  });
   return schema.validate(data);
};

const validateLogin = async (req, res, next) => {
    const { error } = await validateUser(req.body);
  
    if (error) {
      return res.status(BADREQUEST).json({ message: error.message });
    }
    next();
  };

module.exports = {
    validateLogin,
};