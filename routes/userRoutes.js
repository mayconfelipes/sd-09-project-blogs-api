const { Router } = require('express');

const userControllers = require('../controllers/userControllers');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.route('/')
  .post(userControllers.createUser)
  .get(validateToken, userControllers.findUsers);

module.exports = router;
