const { BlogPost, PostCategory, User, Category } = require('../models');
const postValidator = require('../utils/postValidator');

const addPost = async (newPost, userId) => {
  const postValidation = await postValidator(newPost);
  if (postValidation) {
    return postValidation;
  }
  const post = await BlogPost.create({ ...newPost, userId });
  const { id } = post.toJSON();
  newPost.categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ categoryId, postId: id });
  });
  return post.toJSON();
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) {
    return {
      error: {
        code: 404,
        message: 'Post does not exist',
      },
    };
  }
  return post;
};

module.exports = {
  addPost,
  getAllPosts,
  getById,
};