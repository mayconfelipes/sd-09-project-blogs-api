const Joi = require('joi');

const UserSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const blogPostsValidate = (req, _res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = blogPostsValidate;