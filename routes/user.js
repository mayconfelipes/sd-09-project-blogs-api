const express = require('express');

const router = express.Router();

const controllers = require('../controllers/userControllers');

router.post('/', controllers.createNewUser);

module.exports = router;
