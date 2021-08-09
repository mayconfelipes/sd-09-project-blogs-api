const express = require('express');

const router = express.Router();

const controller = require('../controller/post');

router.post('/', controller.createPost);

module.exports = router;
