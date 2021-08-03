const Joi = require('joi');

// tive ajudar do aluno adrina na explicação do joi
// https://github.com/adrianoforcellini

const validateLogin = (body) => {
  const bodyValidate = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    // validar email com dois atomos de dominios exmplo email @gmail.com "gmail" e primeiro e "com" e segundo atomo
    // e o "." que separa o atomo
    password: Joi.string().alphanum().length(6).required(), // alphanum poder ser numero ou letra
  });
  const { error } = Joi.validate(body, bodyValidate);
  if (error === null) {
    return body;
  }
  const { details } = error;
  const message = details.map((i) => i.message).join(',');
  return ({ message });
};

module.exports = validateLogin;
