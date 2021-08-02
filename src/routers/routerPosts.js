const express = require('express');
const rescue = require('express-rescue');
const postsController = require('../controllers/postsController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, rescue(postsController.create));
router.get('/', validateJWT, rescue(postsController.getAll));

module.exports = router; 