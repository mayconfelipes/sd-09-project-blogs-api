const Joi = require('joi');

const postVerify = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
});
// .messages({
//     'string.required': '{#label} is required',
// });

module.exports = postVerify;