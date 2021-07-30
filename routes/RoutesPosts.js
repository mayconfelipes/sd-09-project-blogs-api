const express = require('express');

const router = express.Router();

const ControllerPosts = require('../controllers/ControllerPosts');
const Middlewares = require('../middlewares');

router.post('/', Middlewares.validJWT, Middlewares.validPost, ControllerPosts.create);
router.get('/', Middlewares.validJWT, ControllerPosts.getAll);
router.get('/:id', Middlewares.validJWT, ControllerPosts.getPostById);
router.put('/:id', Middlewares.validUpdatePost, Middlewares.validJWT, ControllerPosts.updatePost);
router.delete('/:id', Middlewares.validJWT, ControllerPosts.deletePost);

module.exports = router;