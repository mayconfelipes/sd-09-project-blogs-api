const boom = require('@hapi/boom');
const { User } = require('../models');

const createUser = async (user) => {
    try {
        const addUser = await User.create({ ...user });
        return addUser;
    } catch (e) {
        throw boom.conflict('User already registered');
    }
};

const findAll = async () => {
    const allUsers = await User.findAll();
    return allUsers;
};

const findById = async (id) => {
    try {
        const idUsers = await User.findOne({ where: { id } });
        if (!idUsers) throw new Error();
        return idUsers;
    } catch (e) {
        throw boom.notFound('User does not exist');
    }
};
const deleteYourSelf = async ({ email }) => {
    const { id } = await User.findOne({ where: { email } });
    const deletePost = await User.destroy({ where: { id } });
    return deletePost;
};
module.exports = { createUser, findAll, findById, deleteYourSelf };