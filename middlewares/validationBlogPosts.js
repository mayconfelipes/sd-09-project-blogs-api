const Joi = require('joi');

const validation = (body) => {
  const bodyValidation = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().valid(1, 2)).required(),
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