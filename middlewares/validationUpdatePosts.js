const Joi = require('joi');

const validation = (body) => {
  const bodyValidation = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  const { error } = Joi.validate(body, bodyValidation);
  if (error === null) {
    return body;
  } 
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    return ({ message });
};

module.exports = validation;