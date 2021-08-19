const { Router } = require('express');

const userControllers = require('../controllers/userControllers');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.route('/')
  .post(userControllers.createUser)
  .get(validateToken, userControllers.findUsers);

router.route('/:id').get(validateToken, userControllers.findById);

router.route('/me').delete(validateToken, userControllers.deleteUser);

module.exports = router;
