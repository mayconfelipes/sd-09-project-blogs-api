const express = require('express');

const router = express.Router();
const categoriesService = require('../services/categoriesService');
const { validateCategorie, validateToken } = require('../middlewares');

const statusSucessCreate = 201;

router.post('/', validateCategorie, validateToken, async (req, res, _next) => {
  const newCategorie = await categoriesService.create(req.body.name);

  res.status(statusSucessCreate).json(newCategorie);
});

module.exports = router; 