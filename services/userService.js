const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const validateUser = async (body) => {
  try {
    const validate = await schema.validate(body);
    return validate;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  validateUser,
};
