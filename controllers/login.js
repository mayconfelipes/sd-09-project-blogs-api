const express = require('express');
const Service = require('../services/login');
const StatusCode = require('../util/statusCode');
const Auth = require('../util/auth');
const validadeRequestBody = require('../middlewares/validateRequestBody');
const ErrorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/', validadeRequestBody.login, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Service.login(email, password);
    const token = Auth.generateToken(user);
    res.status(StatusCode.ok).json({ token });
  } catch (err) {
      next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;