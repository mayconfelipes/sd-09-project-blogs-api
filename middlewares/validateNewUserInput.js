const Joi = require('joi');

const validateUserWithJoi = (data) => {
  const schema = Joi.object({
    displayName: Joi
      .string()
      .min(8)
      .required(),
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .min(6)
      .error(new Error('"password" length must be 6 characters long')),
    image: Joi.string().required(),
  });
   return schema.validate(data);
};

const validateNewUserInput = async (req, res, next) => {
  const { error } = await validateUserWithJoi(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  return next();
};

module.exports = validateNewUserInput;