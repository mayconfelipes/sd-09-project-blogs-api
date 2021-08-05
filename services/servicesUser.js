const Joi = require('joi');
// const { User } = require('../models');
const { BADREQUEST, CREATE } = require('../ultils');

const validateUser = (data) => {
  const schema = Joi.object({
    displayName: Joi
      .string()
      .min(8)
      .error(new Error('"displayName" length must be at least 8 characters long'))
      .required(),
    email: Joi
      .string()
      .email()
      .error(new Error('"email" must be a valid email')),
    password: Joi
      .string()
      .min(6)
      .error(new Error('"password" length must be 6 characters long')),
    image: Joi.string().required(),
  });
   return schema.validate(data);
};

const create = async (data) => {
    const { error } = await validateUser(data);
    // console.log(error);
    if (error) {
     return { message: error.message, code: BADREQUEST };
    }
    if (!data.email) {
        return { 
            message: '"email" is required',
            code: BADREQUEST,
    };
    }
    if (!data.password) {
        return { 
            message: '"password" is required',
            code: BADREQUEST, 
        };
    }
    return CREATE;
};

module.exports = {
    create,
};