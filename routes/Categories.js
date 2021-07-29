const express = require('express');
const CategoriesControllers = require('../controllers/Categories');
const validate = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/', validate.jwtValidate, CategoriesControllers.createCategory);
router.get('/', validate.jwtValidate, CategoriesControllers.findAll);

module.exports = router;