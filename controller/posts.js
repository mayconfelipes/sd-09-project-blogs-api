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

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPost.findOne(
    { where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ] },
  );

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
});

router.put('/:id', auth, validate.categoriesValidate, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user; // variavel saldo do auth middleware
  const { title: titles, content: contents } = req.body;

  const postsId = await BlogPost.findOne({ where: { id }, include: ['user', 'categories'] });
  // if (!postsId) {
  //   return res.status(404).json({ message: 'not found' });
  // }
  const usersId = await User.findOne({ whre: { email } });
  if (postsId.id !== usersId.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  await BlogPost.update({ titles, contents }, { where: { id } });
  const update = await BlogPost.findOne({ where: { id }, include: ['user', 'categories'] }); 
  console.log(update);
  const { dataValues: { title, content, userId } } = update;
  const { name } = update.categories[0];
  // const { id } = update.categories[0];
  
  return res.status(200).json({ title, content, userId, categories: { name, id } });
});

module.exports = router;