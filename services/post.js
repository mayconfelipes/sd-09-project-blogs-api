const Joi = require('joi');
const { BlogPosts } = require('../models');

const postSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const checkPost = (params) => postSchema.validate(params);

const createPost = async (post) => {
  const newPost = await BlogPosts.create(post);
  return newPost;
};

module.exports = { checkPost, createPost };
