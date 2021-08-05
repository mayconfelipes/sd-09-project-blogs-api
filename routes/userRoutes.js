const { Router } = require('express');

const userControllers = require('../controllers/userControllers');

const router = Router();

router.route('/')
  .post(userControllers.createUser)
  .get(userControllers.findUsers);

module.exports = router;
