const { Router } = require('express');

const categoryControllers = require('../controllers/categoryControllers');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.route('/')
  .post(validateToken, categoryControllers.createUser);

module.exports = router;
