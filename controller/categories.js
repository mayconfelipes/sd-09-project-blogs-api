const express = require('express');
const { Categorie } = require('../models');

const router = express.Router();

const { auth } = require('../middlewares/auth');

const ok = 200;
const created = 201;
const badRequest = 400;
const internalServerError = 500;

router.get('/', auth, async (_req, res) => {
  try {
    const categories = await Categorie.findAll();

    return res.status(ok).json(categories);
  } catch (e) {
    console.log(e.message);
    res.status(internalServerError).json({ message: 'Algo deu errado' });
  }
});

router.post('/', auth, async (req, res) => {
  const { name } = req.body;

    if (!name) { 
      return res.status(badRequest).json({ message: '"name" is required' }); 
    }

  try {
    const newCategorie = await Categorie.create({ name });

    return res.status(created).json(newCategorie);
  } catch (e) {
    console.log(e.message);
    res.status(internalServerError).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;