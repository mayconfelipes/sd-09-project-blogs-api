const boom = require('@hapi/boom');
const { Categories } = require('../models');

const createCategory = async (post) => {
    try {
    const category = await Categories.create({ ...post });
    return category;
    } catch (e) {
        throw boom.conflict('User already REGISTRO POST');
    }
};

const findAll = async () => {
    const allUsers = await Categories.findAll();
    return allUsers;
};
module.exports = { createCategory, findAll };