const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const validateLogin = async (body) => {
  try {
    const validate = await schema.validate(body);
    return validate;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  validateLogin,
};
