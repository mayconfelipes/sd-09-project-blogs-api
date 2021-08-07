const express = require('express');
const rescue = require('express-rescue');
const postsControllers = require('../controllers/postsControllers');
const validateJWT = require('../middlewares/validateJWT');
const { validateFormPost } = require('../middlewares/validateFormPost');

const router = express.Router();

router.post('/post', validateJWT, validateFormPost, rescue(postsControllers.createPost));
router.get('/post', validateJWT, rescue(postsControllers.getAllPosts));

module.exports = router;