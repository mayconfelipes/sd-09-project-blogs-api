const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const categorieController = require('../controllers/Categories');

router.post('/', categorieController.createCategorie);

module.exports = router;
