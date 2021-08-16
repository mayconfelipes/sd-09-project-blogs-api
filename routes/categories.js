const express = require('express');

const {
  createCategory,
  getCategories,
} = require('../controllers/categories');

const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validateJWT, createCategory);
router.get('/', middlewares.validateJWT, getCategories);

module.exports = router;
