const rescue = require('express-rescue');
const PostService = require('../Services/postService');

const addPost = rescue(async (req, res, _next) => {
  const dataPost = req.body;
  await PostService.addPost(dataPost);
  res.status(200).json(dataPost);
});

const getAllPosts = rescue(async (req, res, _next) => {
 const name = req.body;
 res.status(200).json(name);
});

const getPostById = rescue(async (req, res, _next) => {
  const postId = req.params;
  res.status(200).json(postId);
});

const updatedPost = rescue(async (req, res, _next) => {
  const postId = req.param;
  res.status(200).json(postId);
});

const deletePost = rescue(async (req, res, _next) => {
  const postId = req.param;
  res.status(200).json(postId);
});

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatedPost,
  deletePost,
};