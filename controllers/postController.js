const express = require('express');

const router = express.Router();
const postService = require('../services/postService');
const { validatePost, validateToken, validateCategorie } = require('../middlewares');

const statusSucessCreate = 201;
const ok = 200;
const notFound = 404;

router.post('/', validatePost, validateCategorie, validateToken, async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req;
  const newPost = await postService.create(title, content, categoryIds, id);

  res.status(statusSucessCreate).json(newPost);
});

router.get('/', validateToken, async (_req, res, _next) => {
  const posts = await postService.getAll();

  return res.status(ok).json(posts);
});

router.get('/:id', validateToken, async (req, res, _next) => {
  const post = await postService.getById(req.params.id);

  if (!post) return res.status(notFound).json({ message: 'Post does not exist' });
  
  return res.status(ok).json(post);
});

module.exports = router;