const { Router } = require('express');
const User = require('../controllers/User');

const router = Router();

router.use('/user', User);

module.exports = router;
