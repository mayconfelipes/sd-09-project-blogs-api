const router = require('express').Router();

const user = require('./user');
const login = require('./login');
const categories = require('./categories');

router.use('/user', user);
router.use('/login', login);
router.use('/categories', categories);

module.exports = router;
