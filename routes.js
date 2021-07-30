const express = require('express');

const { users } = require('./controllers');

const router = express.Router();

router.post('/user', users.create );

module.exports = router;
