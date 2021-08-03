const router = require('express').Router();

const { postsController } = require('../controllers');
const middlewares = require('../middlewares');

// Create post
router.post('/', middlewares.authentication, postsController.create);

// Get all posts
router.get('/', middlewares.authentication, postsController.getAll);

module.exports = router;
