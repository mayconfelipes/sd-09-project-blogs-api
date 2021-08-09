const express = require('express');
const middValidate = require('../middlewares/validateToken');
const blogPostControllers = require('../controllers/blogPostControllers');

const userRoutes = express.Router();

userRoutes.post('/',
  blogPostControllers.validateFields,
  middValidate.validateToken,
  blogPostControllers.addPost);

userRoutes.get('/', middValidate.validateToken, blogPostControllers.listAllPosts);

module.exports = userRoutes;
