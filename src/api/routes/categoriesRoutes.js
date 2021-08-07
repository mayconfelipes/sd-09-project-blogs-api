const express = require('express');

const Category = require('../../controllers/Category');
const { validateToken, validateName } = require('../../middlewares');

const router = express.Router();

router.post('/', [validateToken, validateName, Category.create]);

router.get('/', [validateToken, Category.findAll]);
module.exports = router;
