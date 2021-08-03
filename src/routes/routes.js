const { Router } = require('express');
const User = require('../controllers/User');

const router = Router();

router.use('/user', User.UserRouter);
router.use('/login', User.LoginRouter);

module.exports = router;
