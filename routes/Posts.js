const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const postController = require('../controllers/Posts');

router.post('/', postController.createPosts);
router.get('/', postController.getAllPosts);

module.exports = router;
