const express = require('express');

const router = express.Router();

const {
    createUser,
    findAllUser,
    findUserById,
} = require('../userController');

const { validateToken } = require('../../utils/validateToken');

router.post('/', createUser);
router.get('/', validateToken, findAllUser);
router.get('/:id', validateToken, findUserById);

module.exports = router;
