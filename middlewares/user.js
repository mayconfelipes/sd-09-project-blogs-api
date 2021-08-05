const Joi = require('joi');
// const { User } = require('../models');
const { BADREQUEST } = require('../ultils');

const validateUser = (data) => {
  const schema = Joi.object({
    displayName: Joi
      .string()
      .min(8)
      .required(),
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .min(6)
      .error(new Error('"password" length must be 6 characters long')),
    image: Joi.string().required(),
  });
   return schema.validate(data);
};

const validateIn = async (req, res, next) => {
    const { error } = await validateUser(req.body);
  
    if (error) {
      return res.status(BADREQUEST).json({ message: error.message });
    }
    next();
  };

module.exports = {
    validateIn,
};