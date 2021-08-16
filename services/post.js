const Joi = require('joi');
const { BlogPosts, Users, Categories } = require('../models');

const postSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const updatedPostSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
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

const findPostById = async (blogPostId) => {
  try {
    const post = await BlogPosts.findOne({
      where: { id: blogPostId },
      include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] });
    return post;
  } catch (error) {
    return error;
  }
};

const checkUser = async (id, postId) => {
  const post = await findPostById(postId);
  return post.id === id;
};

const checkUpdatedPost = (params) => updatedPostSchema.validate(params);

const editPost = async (body, id) => {
  await BlogPosts.update(body, { where: { id } });
  const editedPost = await BlogPosts.findOne({
    where: { id },
    include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
  });
  return editedPost;
};

module.exports = {
  checkPost,
  createPost,
  findPosts,
  findPostById,
  checkUpdatedPost,
  checkUser,
  editPost,
};
