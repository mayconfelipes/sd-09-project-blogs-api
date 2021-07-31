const express = require('express');
const Joi = require('joi');
const rescue = require('express-rescue');
const validateJWT = require('../api/auth/validateJWT');
const postService = require('../services/postService');
const validate = require('../middlewares/validate');
const validateUpdate = require('../middlewares/validateUpdate');

const router = express.Router();

router.post('/post', [
  validateJWT,
  validate(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  })),
  rescue(async (req, res, next) => {
    const post = await postService.createPost(req.userId, req.body);

    if (post.error) {
      post.error.status = 400;
      return next(post.error);
    }

    return res.status(201).json(post);
  }),
]);

router.get('/post', [
  validateJWT,
  rescue(async (req, res, _next) => {
    const post = await postService.getAll();
    return res.status(200).json(post);
  }),
]);

router.get('/post/:id', [
  validateJWT,
  rescue(async (req, res, next) => {
    const post = await postService.getById(req.params.id);

    if (post.error) {
      post.error.status = 404;
      return next(post.error);
    }

    return res.status(200).json(post);
  }),
]);

router.put('/post/:id', [
  validateJWT,
  validateUpdate,
  validate(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  })),
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const postUpdated = await postService.updatePost(id, req.body, req.userId);

    if (postUpdated.error) {
      postUpdated.error.status = 401;
      return next(postUpdated.error);
    }

    return res.status(200).json(postUpdated);
  }),
]);

module.exports = router;