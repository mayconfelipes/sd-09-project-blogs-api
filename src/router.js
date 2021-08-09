const express = require('express');
const userRouter = require('./user/userRouter');

const router = express.Router();

router.use('/', userRouter);

module.exports = router;
