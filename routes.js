const express = require('express');
const { users, categories, blogPosts } = require('./controllers');

const {
  createToken,
  validateUser,
  validateLogin,
  validateToken,
  emailExists,
  validateName,
  validatePost,
  validateCategory,
} = require('./middlewares');

const router = express.Router();

router.get('/user', validateToken, users.getUsers);
router.get('/user/:id', validateToken, users.getById);
router.post('/user', validateUser, createToken, emailExists, users.create);
router.post('/login', validateLogin, createToken, emailExists, users.login);

router.post('/categories', validateToken, validateName, categories.createCategory);
router.get('/categories', validateToken, categories.getCategories);

router.post('/post', validateToken, validatePost, validateCategory, blogPosts.createPost);

module.exports = router;
