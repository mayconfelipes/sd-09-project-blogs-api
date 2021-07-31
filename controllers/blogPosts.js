const Joi = require('joi');
const rescue = require('express-rescue');
const blogPostServices = require('../services/blogPosts');
const { validate } = require('../middlewares');

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
});

const create = [
  validate(blogPostSchema),
  rescue(async (req, res, next) => {
    const postInfo = req.body;
    const { id } = req.user.dataValues;
    const createdPost = await blogPostServices.create({ userId: id, ...postInfo });

    if (createdPost.error) return next(createdPost.error);

    return res.status(201).json(createdPost);
  }),
];

module.exports = {
  create,
};
