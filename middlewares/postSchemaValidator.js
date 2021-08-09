const Joi = require('joi');

const validatePost = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  });

  const postValidation = postSchema.validate({ title, content, categoryIds }); 

  if (postValidation.error) {
    return next(postValidation.error);
  }

  return next();
};

module.exports = validatePost;
