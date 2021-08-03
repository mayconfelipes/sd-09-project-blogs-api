const { Router } = require('express');
const User = require('../controllers/User');
const Category = require('../controllers/Category');

const router = Router();

router.use('/user', User.UserRouter);
router.use('/login', User.LoginRouter);
router.use('/categories', Category.CategoryRouter);

module.exports = router;
