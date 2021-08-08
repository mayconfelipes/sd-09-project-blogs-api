const postService = require('../services/postService');

const CREATED = 201;
// const OK = 200;

const createPost = async (req, res) => {
  const newPost = req.body;
  const { id: userId } = req.user;
  const blogPost = await postService.createPost(newPost, userId);
  return res.status(CREATED).json(blogPost);
};

// const getAllcategories = async (req, res) => {
//   const categories = await categoriesService.getAllCategories();
//   return res.status(OK).json(categories);
// };

module.exports = {
  createPost,
  // getAllcategories,
};