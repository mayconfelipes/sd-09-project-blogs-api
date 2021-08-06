const express = require('express');
const { Categorie } = require('../models');
const { auth } = require('../middlewares/auth');
// const { BADREQUEST, INTERNERERROR, CREATE, OK } = require('../ultils');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
        const newCategory = await Categorie.create({ name });
        
        return res.status(201).json(newCategory);
});

router.get('/', auth, async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        console.log(categories);
       return res.status(200).json(categories);
    } catch (error) {
       return res.status(500).json(error);
    }
});

module.exports = router;