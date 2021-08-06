const express = require('express');

const router = express.Router();

const controller = require('../controller/category');

router.post('/', controller.createCategory);

module.exports = router;
