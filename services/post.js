const Joi = require('joi');
const { BlogPosts, Users, Categories } = require('../models');

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

const findPosts = async () => {
  try {
    const allPosts = await BlogPosts.findAll(
      {
        include: [
          { model: Users, as: 'user', attributes: { exclude: ['password'] } },
          { model: Categories, as: 'categories', through: { attributes: [] } },
        ],
      },
    );
    return allPosts;
  } catch (error) {
    return error;
  }
};

module.exports = { checkPost, createPost, findPosts };
