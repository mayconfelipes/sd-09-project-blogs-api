const express = require('express');
const { createUser, findAll, findById, deleteUser } = require('../Controllers/userController');
const validateJWT = require('../Auth/validateJWT');

const router = express.Router();

router.post('/', createUser);
router.get('/', validateJWT, findAll);
router.get('/:id', validateJWT, findById);
router.delete('/me', validateJWT, deleteUser);

module.exports = router;