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
  rescue(async (req, res, _next) => {
    const { body, user } = req;
    const post = await PostService.createPosts(body, user);
    res.status(201).json(post);
  }),
];

module.exports = {
  createPosts,
};
