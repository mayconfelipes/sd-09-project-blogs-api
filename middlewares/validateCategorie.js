const { Category } = require('../models');

module.exports = async (req, res, next) => {
    const { categoryIds } = req.body;
    const categories = categoryIds.map((id) => Category.findOne({ where: { id } }));
    const promise = await Promise.all(categories);
    const result = promise.find((value) => value === null);
    if (result === null) return res.status(400).json({ message: '"categoryIds" not found' });

    next();
};