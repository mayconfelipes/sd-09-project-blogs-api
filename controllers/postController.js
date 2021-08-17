const code = require('../utils/codes');
const {
  createPostService,
  getAllPostsService,
} = require('../services/postService');

const createPostController = async (req, res) => {
  const newPost = req.body;
  const { id: userId } = req.user.data;

  const blogPost = await createPostService(newPost, userId);
  return res.status(code.CREATED).json(blogPost.dataValues);
};

const getAllPostsController = async (_req, res) => {
  const blogPosts = await getAllPostsService();
  console.log(blogPosts);
  return res.status(code.OK).json(blogPosts);
};

module.exports = {
  createPostController,
  getAllPostsController,
};