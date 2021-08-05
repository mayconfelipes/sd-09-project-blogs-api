const express = require('express');
const { addCategories, getAllCategories } = require('../Controllers/categoriesController');

const router = express.Router();

router.post('/', addCategories);
router.get('/', getAllCategories);

module.exports = router;