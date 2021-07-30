const express = require('express');

const router = express.Router();

const ControllerCategories = require('../controllers/ControllerCategories');
const Middlewares = require('../middlewares');

router.post('/', Middlewares.validJWT, Middlewares.validCategory, ControllerCategories.create);
router.get('/', Middlewares.validJWT, ControllerCategories.getAll);

module.exports = router;