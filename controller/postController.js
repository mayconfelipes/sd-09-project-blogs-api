const express = require('express');
const { auth } = require('../middlewares/auth');
const { BlogPost, Categorie } = require('../models');
const { CREATE, OK, INTERNERERROR } = require('../ultils');
const post = require('../middlewares/post');

const User = require('../models/user');

const router = express.Router();

router.get('/', auth, async (_req, res) => {
    try {
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
  
      return res.status(OK).json(posts);
    } catch (e) {
      console.log(e.message);
      res.status(INTERNERERROR).json({ message: 'Algo deu errado' });
    }
  });

  router.post('/', auth, post.validatePost, async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.id;
    
    try {
      const newBlogPost = await BlogPost.create({ title, content, userId, categoryIds });
  
      return res.status(CREATE).json(newBlogPost);
    } catch (e) {
      console.log(e.message);
      res.status(INTERNERERROR).json({ message: 'Algo deu errado' });
    }
  });

module.exports = router;