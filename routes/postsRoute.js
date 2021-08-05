const express = require('express');
const rescue = require('express-rescue');
const postsControllers = require('../controllers/postsCotrollers');
const validateToken = require('../middlewares/validateToken');
const { validateFormPost } = require('../middlewares/validateFormPost');

const router = express.Router();

router.post('/post', validateToken, validateFormPost, rescue(postsControllers.createPost));
router.get('/post', validateToken, rescue(postsControllers.getAllPosts));
router.get('/post/:id', validateToken, rescue(postsControllers.getPostById));
router.put('/post/:id', validateToken, rescue(postsControllers.updatePost));
router.delete('/post/:id', validateToken, rescue(postsControllers.deletePost));

module.exports = router;