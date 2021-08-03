const express = require('express');

const router = express.Router();
const categoriesService = require('../services/categoriesService');
const { validateCategorieName, validateToken } = require('../middlewares');

const statusSucessCreate = 201;
const ok = 200;

router.post('/', validateCategorieName, validateToken, async (req, res, _next) => {
  const newCategorie = await categoriesService.create(req.body.name);

  res.status(statusSucessCreate).json(newCategorie);
});

router.get('/', validateToken, async (_req, res, _next) => {
    const categories = await categoriesService.getAll();
  
    return res.status(ok).json(categories);
  });

module.exports = router; 