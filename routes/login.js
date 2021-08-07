const express = require('express');

const router = express.Router();

const controllers = require('../controllers/loginControllers');
// const tokenValidation = require('../verifications/jwtVerification');

router.post('/', controllers.loginUser);

module.exports = router;
