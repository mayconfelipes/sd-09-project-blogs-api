const Joi = require('joi');

const { code: { BAD_REQUEST } } = require('../utils');

const schema = Joi.object({
  name: Joi.string().required(),
});

const validateName = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(BAD_REQUEST).json({ message: error.message });

  next();
};

module.exports = validateName;
