const express = require('express');

const router = express.Router();

const controller = require('../controller/post');

router.post('/', controller.createPost);

router.get('/', controller.getAllPost);

router.get('/:id', controller.getPostById);

router.put('/:id', controller.updatePost);

router.delete('/:id', controller.deletePost);

module.exports = router;
