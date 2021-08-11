const rescue = require('express-rescue');
const BlogPostService = require('../Services/BlogPostService');

const addPost = rescue(async (req, res, _next) => {
  const dataPost = {
    body: req.body,
    user: req.user,
  };
  const post = await BlogPostService.addPost(dataPost);
  res.status(201).json(post);
});

const getAllPosts = rescue(async (req, res, _next) => {
 const listPost = await BlogPostService.findAll();
 res.status(200).json(listPost);
});

const getPostById = rescue(async (req, res, _next) => {
  const postId = req.params.id;
  const result = await BlogPostService.findById(postId);
  res.status(200).json(result);
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