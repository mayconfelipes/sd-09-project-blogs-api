const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.post('/', rescue(postsController.createPost));
router.get('/', rescue(postsController.getAllPosts));

module.exports = router;