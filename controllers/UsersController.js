const jwt = require('jsonwebtoken');
const userServices = require('../services/UsersServices');

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
    const { message } = user;
    if (!message) {
        const token = jwt.sign({ user }, JWT_SECRET, {
            expiresIn: '1h', algorithm: 'HS256',
        });
        return res.status(201).json({ token });
    } if (message === 'User already registered') {
        return res.status(409).json({ message });
    }
    return res.status(400).json({ message });
};

const login = async (req, res) => {
    const user = await userServices.login(req.body);
    const { message } = user;
    if (!message && message !== 'Invalid fields') {
        const token = jwt.sign({ user }, JWT_SECRET, {
            expiresIn: '1h', algorithm: 'HS256',
        });
        return res.status(200).json({ token });
    }
    return res.status(400).json(user);
};

const getbyId = async (req, res) => {
    const { id: idReq } = req.params;
    const user = await userServices.getbyId(idReq);
    if (user) {
        const { id, displayName, email, image } = user;
        return res.status(200).json({ id, displayName, email, image });
    }
    res.status(404).json({ message: 'User does not exist' });
};

module.exports = { getAll, addUser, getbyId, login };