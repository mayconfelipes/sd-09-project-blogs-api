const express = require('express');

const router = express.Router();

const services = require('../services');
const { User, BlogPost, Categories } = require('../models');

const tokenNotFound = 'Token not found';

router.post('/', async (req, res) => {
  const token = req.headers.authorization;
  const { title, content, categoryIds } = req.body;

  if (!token) return res.status(401).json({ message: tokenNotFound });

  const validate = await services.post.validatePost(req.body);

  if (validate.isJoi) return res.status(400).json({ message: validate.details[0].message });

  const jwtValidation = await services.jwtService.jwtValidate(token);
  if (jwtValidation.message) return res.status(401).json({ message: jwtValidation.message });

  const validIds = await services.post.validateIds(categoryIds);
  if (validIds) return res.status(400).json({ message: '"categoryIds" not found' });

  const newPost = { title, content, userId: jwtValidation.data.id };
  const sendNewPost = await BlogPost.create(newPost);
  return res.status(201).json(sendNewPost);
});

router.get('/', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: tokenNotFound });

  const jwtValidation = await services.jwtService.jwtValidate(token);
  if (jwtValidation.message) return res.status(401).json({ message: jwtValidation.message });

  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return res.status(200).json(posts);
});

router.get('/:id', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: tokenNotFound });

  const jwtValidation = await services.jwtService.jwtValidate(token);
  if (jwtValidation.message) return res.status(401).json({ message: jwtValidation.message });

  const posts = await BlogPost.findByPk(req.params.id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!posts) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(posts);
});

router.put('/:id', async (req, res) => {
  const token = req.headers.authorization;

  if (req.body.categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });

  if (!token) return res.status(401).json({ message: tokenNotFound });

  const validate = await services.post.validateUpdatePost(req.body);

  if (validate.isJoi) return res.status(400).json({ message: validate.details[0].message });

  const jwtValidation = await services.jwtService.jwtValidate(token);
  if (jwtValidation.message) return res.status(401).json({ message: jwtValidation.message });

  const post = await services.post.getPostById(req.params.id, jwtValidation.data.id, req.body);

  return res.status(post.status).json(post.res);
});

router.delete('/:id', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: tokenNotFound });

  const jwtValidation = await services.jwtService.jwtValidate(token);
  if (jwtValidation.message) return res.status(401).json({ message: jwtValidation.message });

  console.log(jwtValidation);

  const deletePost = await services.post.verifyAndDeletePost(req.params.id, jwtValidation.data.id);

  return res.status(deletePost.status).json(deletePost.res);
});

module.exports = router;
