const express = require('express');

const { postUsers } = require('../controllers/users');

const router = express.Router();

router.post('/', postUsers);

module.exports = router;