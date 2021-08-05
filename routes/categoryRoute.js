const express = require('express');
const rescue = require('express-rescue');
const categoryControllers = require('../controllers/categoryControllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/categories', validateToken, rescue(categoryControllers.createCategory));
router.get('/categories', validateToken, rescue(categoryControllers.getAllCategories));

module.exports = router;
