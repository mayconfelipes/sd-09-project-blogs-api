const { BlogPost, PostCategory } = require('../models');
const postValidator = require('../utils/postValidator');

const addPost = async (newPost, userId) => {
  const postValidation = await postValidator(newPost);
  console.log('service', postValidation);
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

module.exports = {
  addPost,
};