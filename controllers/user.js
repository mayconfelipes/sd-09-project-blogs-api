const express = require('express');
const Service = require('../services/user');
const StatusCode = require('../util/statusCode');
const Auth = require('../middlewares/auth');
const validadeRequestBody = require('../middlewares/validateRequestBody');
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

router.use(ErrorHandler);

module.exports = router;