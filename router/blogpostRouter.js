const express = require('express');
const blogpostService = require('../service/blogpostService');
const tokenService = require('../service/tokenService');

const blogpostRouter = express.Router();

blogpostRouter.post('/', tokenService, blogpostService.createBlogpost);

module.exports = blogpostRouter;