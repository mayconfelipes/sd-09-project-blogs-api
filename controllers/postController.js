const express = require('express');

const router = express.Router();

const services = require('../services');
const { BlogPost } = require('../models');

router.post('/', async (req, res) => {
  const token = req.headers.authorization;
  const { title, content, categoryIds } = req.body;

  if (!token) return res.status(401).json({ message: 'Token not found' });

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

module.exports = router;

  // const categories = await Categories.findAll({
  //   where: { id: { [Op.or]: req.body.categoryIds } },
  // });

  // const newPost = await services.post.createPostStructure(req.body, jwtValidation, categories);
