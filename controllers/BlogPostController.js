const express = require('express');
const { BlogPost } = require('../models');
const { validateUser, validateCategory } = require('../schemas');

const router = express.Router();

const httpStatusCode201 = 201;

router.post('/', validateUser, validateCategory, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  const post = await BlogPost.create({ title, content, userId });
  res.status(httpStatusCode201).json(post);
});

module.exports = router;
