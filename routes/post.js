const express = require('express');

const router = express.Router();

const postController = require('../controllers/post');
const validatePost = require('../middlewares/validatePost');
const tokenValidation = require('../middlewares/tokenValidation');
const validatePostCategorie = require('../middlewares/validatePostCategorie');

router.post('/', tokenValidation, validatePost, validatePostCategorie, postController.createPost);

module.exports = router;
