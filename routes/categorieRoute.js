const express = require('express');
const categorieController = require('../controllers/categorieController');
const {
  verifyName,
} = require('../services/categorieService');
const {
  validToken,
} = require('../services/userService');

const router = express.Router();

router.post('/categories', verifyName, validToken, categorieController.create);
router.get('/categories', validToken, categorieController.findAllCategories);

module.exports = router;