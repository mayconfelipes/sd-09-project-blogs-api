const Post = require('../services/Posts');

const STATUS_OK = 200;
const CREATED = 201;

const addPost = async (req, res) => {
  const postInfo = req.body;
  const { id: userId } = req.user;
  const newPost = await Post.addPost(postInfo, userId);
  return res.status(CREATED).json(newPost);
};

const getAllPosts = async (req, res) => {
  const allPosts = await Post.getAllPosts();
  return res.status(STATUS_OK).json(allPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const postById = await Post.getPostById(id);
  return res.status(STATUS_OK).json(postById);
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
};
