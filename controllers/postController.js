const code = require('../utils/codes');
const {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostService,
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

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const blogPost = await getPostByIdService(id);
  return res.status(code.OK).json(blogPost);
};

const updatePostController = async (req, res) => {
  // console.log(req.params, req.user.id, req.body,'AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
  const { id } = req.params;
  const userId = req.user.id;
  const newContent = req.body;

  const blogPost = await updatePostService(id, userId, newContent);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>blogpost',blogPost);
  return res.status(code.OK).json(blogPost);
};

module.exports = {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
};