const express = require('express');
const postsControllers = require('../controllers/postsCotrollers');
const validateToken = require('../middlewares/validateToken');
const { validateFormPost } = require('../middlewares/validateFormPost');

const router = express.Router();

router.post('/post', validateToken, validateFormPost, postsControllers.createPost);
router.get('/post', validateToken, postsControllers.getAllPosts);
router.get('/post/:id', validateToken, postsControllers.getPostById);
router.put('/post/:id', validateToken, postsControllers.updatePost);
router.delete('/post/:id', validateToken, postsControllers.deletePost);

module.exports = router;