const express = require('express');
const middValidate = require('../middlewares/validateToken');
const blogPostControllers = require('../controllers/blogPostControllers');

const userRoutes = express.Router();

userRoutes.post('/',
  blogPostControllers.validateFields,
  middValidate.validateToken,
  blogPostControllers.addPost);

module.exports = userRoutes;
