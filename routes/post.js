const router = require('express').Router();

const { postsController } = require('../controllers');
const middlewares = require('../middlewares');

// Create post
router.post('/', middlewares.authentication, postsController.create);

// Get all posts
router.get('/', middlewares.authentication, postsController.getAll);

// Get post by ID
router.get('/:id', middlewares.authentication, postsController.getById);

// Edit post
router.put('/:id', middlewares.authentication, postsController.update);

// Delete post
router.delete('/:id', middlewares.authentication, postsController.remove);

module.exports = router;
