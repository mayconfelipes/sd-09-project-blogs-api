const express = require('express');
const jwt = require('jsonwebtoken');
const { BlogPost, Category, User } = require('../models');
const { validateUser, validateCategory } = require('../schemas');

const router = express.Router();

const httpStatusCode200 = 200;
const httpStatusCode201 = 201;
const httpStatusCode401 = 401;

router.get('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) return res.status(httpStatusCode401).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpStatusCode401).json({ message: 'Expired or invalid token' });
    const posts = await BlogPost.findAll({ include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
    res.status(httpStatusCode200).json(posts);
  });
});

router.post('/', validateUser, validateCategory, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  const post = await BlogPost.create({ title, content, userId });
  res.status(httpStatusCode201).json(post);
});

module.exports = router;
