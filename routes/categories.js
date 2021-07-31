const express = require('express');

const categoriesControler = require('../controllers/categories');
const validateCategorie = require('../middlewares/validateCategorie');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', tokenValidation, validateCategorie, categoriesControler.createCategorie);

module.exports = router;
