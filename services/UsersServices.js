const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const validationUser = require('../middlewares/validationUser');
const validationLogin = require('../middlewares/validationLogin');

const verifyToken = (token) => {
    const JWT_SECRET = 'meuSegredoSuperSecreto';
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
};

const getAll = async () => {
    const users = await Users.findAll();
    return users;
};

const findByEmail = async (email) => {
    if (email) {
        const user = await Users.findOne({
            where: { email },
        });
        return user;
    }
};

const getbyId = async (id) => {
    if (id) {
        const user = await Users.findOne({
            where: { id },
        });
        return user;
    }
};

const addUser = async (body) => {
    const validate = await validationUser(body);
    const emailExist = await findByEmail(body.email);
    const { message } = validate;
    if (!message && !emailExist) {
        const user = await Users.create(body);
        return user;
    } if (emailExist) {
        return { message: 'User already registered' };
    }
    return validate;
};

const login = async (body) => {
    const validate = await validationLogin(body);
    const emailExist = await findByEmail(body.email);
    const { message } = validate;
    if (!message && emailExist) {
        return body;
    } if (!message && !emailExist) {
        return { message: 'Invalid fields' };
    }
    return { message };
};

const deleteMe = async (token) => {
    const payload = verifyToken(token);
    if (payload) {
        const { email } = payload.user;
        await Users.destroy({ where: { email } });
        return 'ok';
    }
};

module.exports = { getAll, deleteMe, findByEmail, getbyId, addUser, login };
