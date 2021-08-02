const express = require('express');

const router = express.Router();

const {
  createCategory,
  findCategories,
} = require('../categoriesController');

const { validateToken } = require('../../utils/validateToken');

router.post('/', validateToken, createCategory);
router.get('/', validateToken, findCategories);

module.exports = router;