const rescue = require('express-rescue');
const BlogPostService = require('../Services/BlogPostService');

const addPost = rescue(async (req, res, _next) => {
  const dataPost = {
    body: req.body,
    user: req.user,
  };
  await BlogPostService.addPost(dataPost);
  res.status(201).json(dataPost);
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