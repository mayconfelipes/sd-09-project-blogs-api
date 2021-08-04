const { Router } = require('express');

const loginControllers = require('../controllers/loginControllers');

const router = Router();

router.route('/').post(loginControllers.login);

module.exports = router;
