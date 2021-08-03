const express = require('express');

const router = express.Router();
const postService = require('../services/postService');
const { validatePost, validateToken, validateCategorie } = require('../middlewares');

const statusSucessCreate = 201;
// const ok = 200;

router.post('/', validatePost, validateCategorie, validateToken, async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req;
  const newPost = await postService.create(title, content, categoryIds, id);

  res.status(statusSucessCreate).json(newPost);
});

// router.get('/', validateToken, async (_req, res, _next) => {
//     const categories = await categoriesService.getAll();
  
//     return res.status(ok).json(categories);
//   });

module.exports = router; 