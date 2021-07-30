const Joi = require('joi');
const { Users } = require('../models');

const validateUser = (req, res, next) => {
  const { error } = Joi.object({ 
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(req.body);
  
  if (error) next(error);

  next();
};

const validateEmailUniqueness = async (req, res, next) => {
  const { email } = req.body;
  const response = await Users.findOne({ where: { email } });
  if (response) {
    const error = {
      code: 409,
      message: 'User already registered',
    };
    next(error);
  }
  next();
};

module.exports = { validateUser, validateEmailUniqueness };
