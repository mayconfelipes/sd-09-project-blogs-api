const express = require('express');

const router = express.Router();

const {
    createUser,
    findAllUser,
} = require('../userController');

router.post('/', createUser);
router.get('/', findAllUser);

module.exports = router;
