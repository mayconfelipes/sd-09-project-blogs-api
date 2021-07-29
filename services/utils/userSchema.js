const Joi = require('joi');

const userVerify = Joi.object({
    displayName: Joi.string().required().empty('').min(8),
    email: Joi.string().email().required().empty(''),
    password: Joi.string().required().empty('')
.min(6)
.message('{#label} length must be 6 characters long'),
// .error((error) => console.log(error)),
    image: Joi.string().required(),
}).messages({
    'string.empty.displayName': '{#label} is required',
    
    // 'string.min': '{#label} length must be 6 characters long',
    
});

module.exports = userVerify;