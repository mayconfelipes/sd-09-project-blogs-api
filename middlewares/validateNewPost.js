const Joi = require('joi');

const BAD_REQUEST = 400;

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
    return res.status(BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = validateNewPost;
