const Joi = require('joi');
const rescue = require('express-rescue');
const validateJoi = require('../middlewares/validate');
const validateJWT = require('../middlewares/auth/validateJWT');
const userService = require('../services/User');
const PostService = require('../services/Posts');

const createPosts = [
  validateJWT(userService.getAllUsers),
  validateJoi(
    Joi.object({
      title: Joi.string().not().empty().required(),
      content: Joi.string().not().empty().required(),
      categoryIds: Joi.array().not().empty().required(),
    }),
  ),
  rescue(async (req, res, next) => {
    const { body, user } = req;
    const post = await PostService.createPosts(body, user);
    if 
    (post.error) return next(post);
    res.status(201).json(post);
  }),
];

const getAllPosts = [
  validateJWT(userService.getAllUsers),
  rescue(async (req, res, _next) => {
    const result = await PostService.getAllPosts();
    res.status(200).json(result);
  }),
];

const getPostById = [
  validateJWT(userService.getAllUsers),
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const result = await PostService.getById(id);
    if (result.error) return next(result);
    res.status(200).json(result);
  }),
];

module.exports = {
  createPosts,
  getAllPosts,
  getPostById,
};
