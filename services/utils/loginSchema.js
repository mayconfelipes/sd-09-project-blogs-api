const Joi = require('joi');

const loginVerify = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).messages({
    'string.required': '{#label} is required',
});

module.exports = loginVerify;