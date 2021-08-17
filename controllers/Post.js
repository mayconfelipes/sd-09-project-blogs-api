const express = require('express');
const { User, BlogPost, Category } = require('../models');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = req.user;

    if (categoryIds === undefined) {
      return res.status(400).json({ message: '"categoryIds" is required' });
    }

    const categoryList = await Category.findAll();
    const categoryArray = categoryList.map((item) => item.id);
    
    for (let index = 0; index < categoryIds.length; index += 1) {
      if (!categoryArray.includes(categoryIds[index])) {
        return res.status(400).json({ message: '"categoryIds" not found' });
      }
    }

    const newPost = await BlogPost.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (err) {
    return res.status(400).json({ message: err.errors[0].message });
  }
});

router.get('/', validateJWT, async (_req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  
    return res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.errors[0].message });
  }
});

router.get('/:id', validateJWT, async (req, res) => {
  try {
    const id = req.params;

    const getPost = await BlogPost.findOne({
      where: id,
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!getPost) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(getPost);
  } catch (err) {
    res.status(400).json({ message: err.errors[0].message });
  }
});

router.put('/:id', validateJWT, (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });

  next();
}, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user;

    const getPost = await BlogPost.findByPk(id);
    if (!getPost) return res.status(404).json({ message: 'Post does not exist' });
    if (getPost.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

    await BlogPost.update({ title, content }, { where: { id } });
    const updatedPost = await BlogPost.findOne({
      where: { id },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    const getPost = await BlogPost.findByPk(id);
    if (!getPost) return res.status(404).json({ message: 'Post does not exist' });
    if (getPost.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

    await BlogPost.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
