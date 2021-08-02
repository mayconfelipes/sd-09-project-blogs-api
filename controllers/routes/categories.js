const express = require('express');

const router = express.Router();

const {
  createCategorie,
  findCategories,
} = require('../categoriesController');

const { validateToken } = require('../../utils/validateToken');

router.post('/', validateToken, createCategorie);
router.get('/', validateToken, findCategories);

module.exports = router;