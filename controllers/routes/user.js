const express = require('express');

const router = express.Router();

const {
    createUser,
    findAllUser,
    findUserById,
} = require('../userController');

router.post('/', createUser);
router.get('/', findAllUser);
router.get('/:id', findUserById);

module.exports = router;
