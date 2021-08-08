const express = require('express');

const router = express.Router();

const controllers = require('../controllers/postControllers');
const tokenValidation = require('../verifications/jwtVerification');

router.post('/', tokenValidation, controllers.createNewPost);

router.get('/', tokenValidation, controllers.getAllPosts);

router.get('/:id', tokenValidation, controllers.getPostById);

module.exports = router;
