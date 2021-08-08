const express = require('express');

const router = express.Router();

const controllers = require('../controllers/userControllers');
const tokenValidation = require('../verifications/jwtVerification');

router.post('/', controllers.createNewUser);

router.get('/', tokenValidation, controllers.getAllUsers);

router.get('/:id', tokenValidation, controllers.getUserById);

module.exports = router;
