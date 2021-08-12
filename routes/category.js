const express = require('express');
const categoryController = require('../controllers/category');
const categoryService = require('../services/category');
const helperValidateToken = require('../helpers/validateToken');

const router = express.Router();

router.post(
  '/categories',
  helperValidateToken,
  categoryService.validateName,
  categoryController.insertCategory,
);

router.get(
  '/categories',
  helperValidateToken,
  categoryController.listCategories,
);

module.exports = router;