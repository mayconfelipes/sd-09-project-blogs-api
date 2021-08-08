const express = require('express');

const router = express.Router();

const controllers = require('../controllers/categoriesControllers');
const tokenValidation = require('../verifications/jwtVerification');

router.post('/', tokenValidation, controllers.createNewCategory);

router.get('/', tokenValidation, controllers.getAllCategories);

module.exports = router;
