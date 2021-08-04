const Joi = require('joi');

const validation = (body) => {
  const bodyValidation = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().alphanum().length(6).required(),
  });
  
  const { error } = Joi.validate(body, bodyValidation);
  if (!error) {
    return body;
  } 
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    return ({ message });
};

module.exports = validation;