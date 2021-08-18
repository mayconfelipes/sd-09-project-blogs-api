const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.post('/', rescue(postsController.createCategory));

module.exports = router;