const express = require('express');
const rescue = require('express-rescue');

const blogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.post('/', rescue(blogController.addPost));

module.exports = blogRouter;
