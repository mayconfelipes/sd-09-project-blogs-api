const Joi = require('joi');

const categoryVerify = Joi.object({
    name: Joi.string().required(),
});

module.exports = categoryVerify;