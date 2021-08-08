const express = require('express');
const { createUser, getAllUsers, getUserById } = require('../Controllers/userController');
const validateJWT = require('../Auth/validateJWT');

const router = express.Router();

router.post('/', createUser);
router.get('/', validateJWT, getAllUsers);
router.get('/:id', validateJWT, getUserById);

module.exports = router;