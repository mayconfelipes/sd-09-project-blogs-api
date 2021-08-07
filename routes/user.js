const express = require('express');

const router = express.Router();

const controllers = require('../controllers/userControllers');
const tokenValidation = require('../verifications/jwtVerification');

router.post('/', controllers.createNewUser);

router.get('/', tokenValidation, controllers.getAllUsers);

module.exports = router;
