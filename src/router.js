const express = require('express');
const usersRouter = require('./users/usersRouter');

const router = express.Router();

router.use('/', usersRouter);

module.exports = router;
