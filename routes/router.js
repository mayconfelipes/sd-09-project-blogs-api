const express = require('express');

const router = express.Router();

const userRouter = require('../controllers/userController');
const loginRouter = require('../controllers/loginController');
const categoriesRouter = require('../controllers/categoriesController');
const postRouter = require('../controllers/postController');

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/categories', categoriesRouter);
router.use('/post', postRouter);

module.exports = router;