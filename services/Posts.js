const { BlogPost, User, Category } = require('../models');

const {
  RequestValidator,
  CategoriesValid,
  CustomError,
} = require('../middlewares');
const postSchema = require('../schemas/postSchema');

const addPost = async (postInfo, userInfo) => {
  RequestValidator(postSchema, postInfo);
  const { categoryIds, ...otherPostInfo } = postInfo;
  await CategoriesValid(categoryIds);
  try {
    const newPost = await BlogPost.create(otherPostInfo, userInfo);
    const { published, updated, ...newPostInfo } = newPost;
    return newPostInfo;
  } catch (err) {
    throw new CustomError('Internal error server', 500);
  }
};

const getAllPosts = async () => {
  try {
    const allPosts = await BlogPost.findAll({ include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ] });
  return allPosts;
  } catch (err) {
    throw new CustomError('Internal error server', 500);
  }
};

module.exports = {
  addPost,
  getAllPosts,
};
