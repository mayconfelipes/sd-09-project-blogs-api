const { Router } = require('express');

const controllers = require('../controllers/postControllers');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.route('/')
  .post(validateToken, controllers.createPost)
  .get(validateToken, controllers.getAll);

router.route('/:id')
  .get(validateToken, controllers.getById)
  .delete(validateToken, controllers.deletePost);

module.exports = router;
