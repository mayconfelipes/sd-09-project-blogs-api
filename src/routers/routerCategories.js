const express = require('express');
const rescue = require('express-rescue');
const categoriesController = require('../controllers/categoriesController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, rescue(categoriesController.create));
router.get('/', validateJWT, rescue(categoriesController.getAll));

module.exports = router; 