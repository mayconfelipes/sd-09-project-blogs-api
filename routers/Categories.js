const express = require('express');
const { addCategories, getAllCategories } = require('../Controllers/categoriesController');
const validateJWT = require('../Auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, addCategories);
router.get('/', validateJWT, getAllCategories);

module.exports = router;