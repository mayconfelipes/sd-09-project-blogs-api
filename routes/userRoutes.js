const { Router } = require('express');

const userControllers = require('../controllers/userControllers');

const router = Router();

router.route('/')
  .post(userControllers.createUser);

module.exports = router;
