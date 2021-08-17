const Joi = require('joi');
const code = require('../utils/codes');

const blogPostSchema = Joi.object().keys({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().items(Joi.number()).not().empty()
  .required(),
});

const validateNewPost = (req, res, next) => {
  const newPost = req.body;
  const { error } = blogPostSchema.validate(newPost);
  if (error) {
    return res.status(code.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = {
  validateNewPost,
};