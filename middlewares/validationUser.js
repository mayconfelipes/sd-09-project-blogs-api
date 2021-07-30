const Joi = require('joi');

const validation = (body) => {
  const bodyValidation = Joi.object().keys({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().alphanum().length(6).required(),
    image: Joi.string().required(),
  });
  const { error } = Joi.validate(body, bodyValidation);
  if (error === null) {
    return body;
  } 
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    return ({ error: message });
};

module.exports = validation;