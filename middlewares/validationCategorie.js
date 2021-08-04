const Joi = require('joi');

const validation = (body) => {
  const bodyValidation = Joi.object().keys({
    name: Joi.string().required(),
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