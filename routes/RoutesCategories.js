const express = require('express');

const router = express.Router();

const ControllerCategories = require('../controllers/ControllerCategories');
const Middlewares = require('../middlewares');

router.post('/', Middlewares.validJWT, Middlewares.validCategory, ControllerCategories.create);

module.exports = router;