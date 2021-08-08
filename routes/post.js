const express = require('express');

const router = express.Router();

const controllers = require('../controllers/postControllers');
const tokenValidation = require('../verifications/jwtVerification');

router.post('/', tokenValidation, controllers.createNewPost);

module.exports = router;
