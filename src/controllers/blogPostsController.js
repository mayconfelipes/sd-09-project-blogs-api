const express = require('express');
const { validateToken, validateUSerPrivilege } = require('../middlewares/auth');
const {
  addBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  editBlogPost } = require('../services/blogPostsServices');

const router = express.Router();

router.get('/', validateToken, async (req, res) => {
  try {
    const blogPosts = await getAllBlogPosts();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await getBlogPostById(id);
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
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

router.put('/:id', validateToken, validateUSerPrivilege, async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await editBlogPost(id, req.body);
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/id', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

module.exports = router;