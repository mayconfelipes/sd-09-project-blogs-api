const express = require('express');

const { createUser, getAllUsers, getUserById } = require('../controllers/users');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', createUser);
router.get('/:id', middlewares.validateJWT, getUserById);
router.get('/', middlewares.validateJWT, getAllUsers);

module.exports = router;