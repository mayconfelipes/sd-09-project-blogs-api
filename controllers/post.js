const express = require('express');
const joi = require('joi');

const { post } = require('../services');
const { auth } = require('../middlewares');

const router = express.Router();

const schema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required(),
});

router.post('/', auth, async (req, res, next) => {
  const { email } = req.user;
  const { title, content, categoryIds } = req.body;

  const { error } = schema.validate({ title, content, categoryIds });

  if (error) return next(error);

  const newPost = await post.createPost({ title, content, categoryIds }, email);

  if (newPost.message) return next(newPost);

  res.status(201).json(newPost);
});

router.get('/', auth, async (_req, res, _next) => {
  const posts = await post.readPosts();

  res.status(200).json(posts);
});

module.exports = router;
