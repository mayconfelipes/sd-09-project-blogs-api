const express = require('express');

const router = express.Router();

const userRouter = require('../controllers/userController');
const loginRouter = require('../controllers/loginController');

router.use('/user', userRouter);
router.use('/login', loginRouter);

module.exports = router;