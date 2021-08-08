const express = require('express');

const router = express.Router();

const controllers = require('../controllers/loginControllers');

router.post('/', controllers.loginUser);

module.exports = router;
