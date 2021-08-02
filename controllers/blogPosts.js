const Joi = require('joi');
const rescue = require('express-rescue');
const { validate } = require('../middlewares');
const blogPostServices = require('../services/blogPosts');

const blogPostSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().not().empty().required(),
});

const create = [
  validate(blogPostSchema),
  rescue(async (req, res, next) => {
    const blogPostInfo = req.body;
    const { id } = req.user.dataValues;
    const createdBlogPost = await blogPostServices.create({ userId: id, ...blogPostInfo });

    if (createdBlogPost.error) return next(createdBlogPost.error);

    return res.status(201).json(createdBlogPost);
  }),
];

const getAll = rescue(async (_req, res) => {
  const blogPostsList = await blogPostServices.getAll();
  return res.status(200).json(blogPostsList);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const foundBlogPost = await blogPostServices.getById(id);

  if (foundBlogPost.error) return next(foundBlogPost.error);

  return res.status(200).json(foundBlogPost);
});

module.exports = {
  create,
  getAll,
  getById,
};
