const express = require('express');

const {
  createCategory,
} = require('../controllers/categories');

const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validateJWT, createCategory);

module.exports = router;
