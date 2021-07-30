const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const userController = require('../controllers/User');

router.post('/', userController.login);

module.exports = router;