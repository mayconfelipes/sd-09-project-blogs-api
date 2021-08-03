const Joi = require('joi');
const rescue = require('express-rescue');
const validate = require('../middlewares/validate');

const PostService = require('../services/blogPosts');
// const { BlogPost } = require('../models');

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

module.exports = {
  create,
};