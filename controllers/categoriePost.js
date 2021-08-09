const { Router } = require('express');

const { BlogPosts, Users, Categories } = require('../models');
const { validateToken } = require('../helpers/jwt');
const { 
  categoriePostVal,
  categorieVal,
} = require('../middlewares/categoriePost');

const router = new Router();

router.post('/', validateToken, categoriePostVal, categorieVal, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;

  const user = await Users.findOne({ where: { email } });

  const userId = user.dataValues.id;

  const post = await BlogPosts.create({ userId, title, content, categoryIds });

  return res.status(201).json(post);
});

router.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPosts.findAll(
    { include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] },
  );

  return res.status(200).json(posts);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findOne(
    { where: { id },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] },
  );

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;

  const user = await Users.findOne({ where: { email } });

  const userId = user.dataValues.id;

  const post = await BlogPosts.findOne({
    include: { model: Users, as: 'user', attributes: { exclude: 'password' } },
    where: { id },
  });

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (post.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await BlogPosts.destroy({ where: { userId, id } });

  return res.status(204).json();
});

module.exports = router;
