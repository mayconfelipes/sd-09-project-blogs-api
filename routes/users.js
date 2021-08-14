const express = require('express');

const { createUser, getAllUsers } = require('../controllers/users');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', createUser);
router.get('/', middlewares.validateJWT, getAllUsers);

module.exports = router;