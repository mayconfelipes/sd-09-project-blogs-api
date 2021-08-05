const express = require('express');
const blogPostsController = require('../controllers/blogPostsController');
const {
  validateBody,
} = require('../services/postService');
const {
 validToken,
} = require('../services/userService');

const router = express.Router();

router.post('/post', validToken, validateBody, blogPostsController.create);
router.get('/post', validToken, blogPostsController.findAll);

module.exports = router;