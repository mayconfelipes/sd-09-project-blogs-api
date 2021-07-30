const { Categories } = require('../models');

const getAll = async () => {
    const categories = await Categories.findAll();
    return categories;
};

module.exports = { getAll };