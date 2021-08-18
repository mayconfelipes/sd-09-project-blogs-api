const code = require('../utils/codes');
const {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostService,
  deletePostService,
} = require('../services/postService');

const createPostController = async (req, res) => {
  const newPost = req.body;
  const { id: userId } = req.user;

  const blogPost = await createPostService(newPost, userId);
  return res.status(code.CREATED).json(blogPost.dataValues);
};

const getAllPostsController = async (_req, res) => {
  const blogPosts = await getAllPostsService();
  console.log(blogPosts);
  return res.status(code.OK).json(blogPosts);
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const blogPost = await getPostByIdService(id);
  return res.status(code.OK).json(blogPost);
};

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const newContent = req.body;

  const blogPost = await updatePostService(id, userId, newContent);
  return res.status(code.OK).json(blogPost);
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  await deletePostService(id, userId);
  return res.status(code.NO_CONTENT).json();
};

module.exports = {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
};