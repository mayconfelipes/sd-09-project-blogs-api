const express = require('express');

const router = express.Router();

const {
  createCategorie,
} = require('../categoriesController');

const { validateToken } = require('../../utils/validateToken');

router.post('/', validateToken, createCategorie);

module.exports = router;