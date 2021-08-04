const express = require('express');
const Service = require('../services/user');
const StatusCode = require('../util/statusCode');
const Auth = require('../util/auth');
const validadeRequestBody = require('../middlewares/validateRequestBody');
const validadeToken = require('../middlewares/validadeToken');
const ErrorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/', validadeRequestBody.createUser, async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await Service.create(displayName, email, password, image);
    const token = Auth.generateToken(user);
    res.status(StatusCode.created).json({ token });
  } catch (err) {
      next(err);
  }
});

router.get('/', validadeToken, async (req, res, next) => {
  try {
    const users = await Service.findAll();
    res.status(StatusCode.ok).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validadeToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Service.findById(id);
    res.status(StatusCode.ok).json(user);
  } catch (err) {
    next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;