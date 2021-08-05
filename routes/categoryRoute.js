const express = require('express');
const categoryControllers = require('../controllers/categoryControllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/categories', validateToken, categoryControllers.createCategory);
router.get('/categories', validateToken, categoryControllers.getAllCategories);

module.exports = router;