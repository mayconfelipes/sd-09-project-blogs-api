const { Router } = require('express');
const User = require('../controllers/User');
const Category = require('../controllers/Category');
const BlogPost = require('../controllers/BlogPost');

const router = Router();

router.use('/user', User.UserRouter);
router.use('/login', User.LoginRouter);
router.use('/categories', Category.CategoryRouter);
router.use('/post', BlogPost.BlogPostRouter);

module.exports = router;
