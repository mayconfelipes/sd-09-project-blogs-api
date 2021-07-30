const userServices = require('../services/UsersServices');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'meuSegredoSuperSecreto';

const getAll = async (_req, res) => {
    try {
        const users = await userServices.getAll();
        return res.status(200).json(users);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Ocorreu um erro' });
    }
};

const addUser = async (req, res) => {
    const user = await userServices.addUser(req.body);
    if (user.message === undefined) {
        const token = jwt.sign({ user }, JWT_SECRET, {
            expiresIn: '1h', algorithm: 'HS256',
        });

        return res.status(201).json({ token });
    } if (user.message === 'User already registered') {
        return res.status(409).json(user);
    }
    return res.status(400).json(user);
};

module.exports = { getAll, addUser };