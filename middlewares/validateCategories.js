const Joi = require('joi');

const validateCategories = (body) => {
  const bodyValidate = Joi.object().keys({
    name: Joi.string().required(),
  });
  const { error } = Joi.validate(body, bodyValidate);
  if (error === null) {
    return body;
  }
  const { details } = error;
  const message = details.map((i) => i.message).join(',');
  return ({ message });
};

module.exports = validateCategories;
