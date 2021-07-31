const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, rescue(postsController.create));

module.exports = router; 