const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
});

const validateCategorie = async (body) => {
  try {
    const validate = await schema.validate(body);
    return validate;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  validateCategorie,
};
