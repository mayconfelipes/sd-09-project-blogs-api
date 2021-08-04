const express = require('express');
const Service = require('../services/category');
const StatusCode = require('../util/statusCode');
const validadeRequestBody = require('../middlewares/validateRequestBody');
const validadeToken = require('../middlewares/validadeToken');
const ErrorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/', validadeToken, validadeRequestBody.createCategory, async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Service.create(name);
    res.status(StatusCode.created).json(category);
  } catch (err) {
      next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;