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
  const listPost = await BlogPostService.getAll();
  res.status(200).json(listPost);
});

const getPostById = rescue(async (req, res, _next) => {
  const postId = req.params.id;
  const result = await BlogPostService.findById(postId);
  res.status(200).json(result);
});

const updatedPost = rescue(async (req, res, _next) => {
  const { user } = req;
  const { id } = req.params;

  const result = await BlogPostService.updatedPost(id, req.body, user);
  res.status(200).json(result);
});

const deletePost = rescue(async (req, res, _next) => {
  const { user } = req;
  const { id } = req.params;

  await BlogPostService.deletePost(Number(id), user);
  return res.status(204).json();
});

const findByTitle = rescue(async (req, res, _next) => {
  const title = req.query.q;

  const result = await BlogPostService.findByTitle(title);
  console.log(result);
  res.status(200).json(result);
});

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatedPost,
  deletePost,
  findByTitle,
};