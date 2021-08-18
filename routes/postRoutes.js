const { Router } = require('express');

const controllers = require('../controllers/postControllers');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.route('/')
  .post(validateToken, controllers.createPost);

module.exports = router;
