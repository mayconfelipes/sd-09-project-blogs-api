const router = require('express').Router();
const BlogPostController = require('../controllers/BlogPostController');
const authVerification = require('../middlewares/AuthMiddleware');
const BlogPostValidator = require('../validators/BlogPostValidator');

router.post(
  '/post',
  authVerification,
  BlogPostValidator.createPost,
  BlogPostController.add,
);
router.get('/post', authVerification, BlogPostController.listAll);
router.get('/post/:id', authVerification, BlogPostController.listOne);

module.exports = router;
