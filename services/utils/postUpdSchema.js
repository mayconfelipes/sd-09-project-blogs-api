const Joi = require('joi');

const postUpdVerify = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),

});

module.exports = postUpdVerify;