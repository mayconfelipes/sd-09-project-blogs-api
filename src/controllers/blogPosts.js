const Joi = require('joi');
const rescue = require('express-rescue');
const validate = require('../middlewares/validate');

const PostService = require('../services/blogPosts');
const { BlogPosts, User, Categories } = require('../models');

const create = [
  validate(Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.array().not().empty().required(),
  })),
  rescue(async (req, res) => {
    const { body: { title, content, categoryIds }, user } = req;
    console.log(title);
    const { dataValues: { id: userId } } = user;
    
    const post = await PostService.create(title, content, userId, categoryIds);

    if (post.error) return res.status(400).json(post.error);
    return res.status(201).json(post);
  }),
];

const findAll = rescue(async (_req, res) => {
  const posts = await BlogPosts.findAll(
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Categories, as: 'categories', through: { attributes: [] } }] },
  );
  
  res.status(200).json(posts);
});

module.exports = {
  create,
  findAll,
};