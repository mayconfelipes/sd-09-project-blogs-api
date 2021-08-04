const Joi = require('joi');

// tive ajudar do aluno adrina na explicação do joi
// https://github.com/adrianoforcellini

const validatePosts = (body) => {
  const bodyValidate = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().valid(1, 2)).required(),
  });
  const { error } = Joi.validate(body, bodyValidate);
  if (error === null) {
    return body;
  }
  const { details } = error;
  const message = details.map((i) => i.message).join(',');
  return ({ message });
};

module.exports = validatePosts;
