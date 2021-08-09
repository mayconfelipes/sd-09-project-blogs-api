const express = require('express');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');
const { addCategory, getAllCategories } = require('../services/categoriesServices');

router.get('/', async (_req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', validateToken, async (req, res) => {
  try {
    const categoryName = req.body;
    const response = await addCategory(categoryName);
    res.status(response.response).json(response.message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
