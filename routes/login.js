const router = require('express').Router();
const { loginController } = require('../controllers');

// Login
router.post('/', loginController);

module.exports = router;
