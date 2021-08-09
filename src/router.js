const express = require('express');
const userRouter = require('./user/userRouter');
const categoryRouter = require('./category/categoryRouter');

const router = express.Router();

router.use('/', userRouter);
router.use('/', categoryRouter);

module.exports = router;
