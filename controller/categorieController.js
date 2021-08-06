const express = require('express');
const { Categorie } = require('../models');
const { auth } = require('../middlewares/auth');
const { BADREQUEST, INTERNERERROR, CREATE } = require('../ultils');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(BADREQUEST).json({ message: '"name" is required' });
    }
    try {
        const newCategory = await Categorie.create({ name });
        
        return res.status(CREATE).json(newCategory);
    } catch (error) {
        return res.status(INTERNERERROR).json(error);
    }
});

module.exports = router;