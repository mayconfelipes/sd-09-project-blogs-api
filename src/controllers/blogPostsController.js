const express = require('express');
const { validateToken } = require('../middlewares/auth');
const { addBlogPost, getAllBlogPosts } = require('../services/blogPostsServices');

const router = express.Router();

router.get('/', validateToken, async (req, res) => {
  try {
    const blogPosts = await getAllBlogPosts();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', (req, res) => {
  try {
    res.status(200).json({ item: 'ok' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/search', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

router.post('/', validateToken, async (req, res) => {
  try {
    const blogPostData = req.body;
    blogPostData.userId = req.user.id;
    const blogPost = await addBlogPost(blogPostData);
    res.status(201).json(blogPost);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

router.delete('/id', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

module.exports = router;