const express = require('express');

const router = express.Router();

const userRouter = require('../controllers/userController');
const loginRouter = require('../controllers/loginController');
const categoriesRouter = require('../controllers/categoriesController');

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/categories', categoriesRouter);

module.exports = router;