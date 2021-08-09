const express = require('express');
const { User, Categorie, BlogPost } = require('../models');

const router = express.Router();

const { auth } = require('../middlewares/auth');
const validate = require('../middlewares/posts');

router.get('/', auth, async (_req, res) => {
    const posts = await BlogPost.findAll({
      include: [
        {
          model: User, as: 'user', attributes: { exclude: ['password'] },
        },
        {
          model: Categorie, as: 'categories', through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(posts);
});

router.post('/', auth, validate.validatePost, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id; 
    
    const newBlogPost = await BlogPost.create({ title, content, userId, categoryIds });

    return res.status(201).json(newBlogPost);
});

module.exports = router;