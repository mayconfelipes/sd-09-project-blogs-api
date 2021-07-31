const Joi = require('joi');
const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const BlogPostService = require('../services/blogPost');
const validateJWT = require('../middlewares/validateJWS');

const createPost = [
  validateJWT,
  validate(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  })),
  rescue(async (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    const newPost = await BlogPostService.createPost({ title, content, categoryIds });

    return newPost.error
      ? next(newPost.error)
      : res.status(201).json(newPost);
  }),
];

const getAllPosts = [
  validateJWT,
  rescue(async (req, res) => {
    const posts = await BlogPostService.getAllPosts();

    return res.status(200).json(posts);
  }),
];

const getPostById = [
  validateJWT,
  rescue(async (req, res, next) => {
    const { id } = req.params;

    const post = await BlogPostService.getPostById(id);

    return post.error
      ? next(post.error)
      : res.status(200).json(post);
  }),
];

const editPost = [
  validateJWT,
  validate(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array(),
  })),
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;
    const { email } = req;

    const editedPost = await BlogPostService.editPost({ title, content, categoryIds }, email, id);

    return editedPost.error
      ? next(editedPost.error)
      : res.status(200).json(editedPost);
  }),
];

const deletePost = [
  validateJWT,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const { email } = req;

    const response = await BlogPostService.deletePost(email, id);

    return response.error
      ? next(response.error)
      : res.status(204).end();
  }),
];

const findByQuery = [
  validateJWT,
  rescue(async (req, res) => {
    const { q } = req.query;

    const posts = await BlogPostService.findByQuery(q);

    return res.status(200).json(posts);
  }),
];

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
  findByQuery,
};
