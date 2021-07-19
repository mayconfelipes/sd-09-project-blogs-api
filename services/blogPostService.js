const { BlogPost, PostCategory, User, Category } = require('../models');
const postValidator = require('../utils/postValidator');
const updateValidator = require('../utils/updateValidator');

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

const updatePost = async (data, userId, postId) => {
  const updateValidation = await updateValidator(data, userId, postId);
  if (updateValidation.error) return updateValidation;
  await BlogPost.update(
    { ...data, updated: new Date() },
    { where: { id: postId } },
  );
  return updateValidation;
};

const deletePost = async (postId, userId) => {
  const post = await BlogPost.findByPk(postId);
  if (post === null) {
    return { error: {
      code: 404,
      message: 'Post does not exist',
    },
  };
}
  const { userId: id } = post.toJSON();
  if (id !== userId) {
    return {
      error: { 
        code: 401,
        message: 'Unauthorized user',
      },
    }; 
  }
  await BlogPost.destroy({ where: { id: postId } });
};

module.exports = {
  addPost,
  getAllPosts,
  getById,
  updatePost,
  deletePost,
};