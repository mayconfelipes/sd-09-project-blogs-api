const router = require('express').Router();
const { UserController } = require('../controllers');

router.post('/', UserController.create);

module.exports = router;