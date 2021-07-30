const jwt = require('jsonwebtoken');
const userModel = require('../models/Users');

const responses = {
    allFields: 'All fields must be filled',
    invalid: 'Incorrect username or password',
};

const JWT_SECRET = 'meuSegredoSuperSecreto';

const validateBody = async (body) => {
    if (body.password === undefined || body.email === undefined) {
        return responses.allFields;
    }
    const user = await userModel.findByEmail(body.email);
    if (user === null) {
        return responses.invalid;
    }
};

const login = async (req, res, _next) => {
    const validate = await validateBody(req.body);
    if (validate === responses.allFields) {
        return res.status(401).json({ message: responses.allFields });
    } if (validate === responses.invalid) {
        return res.status(401).json({ message: responses.invalid });
    }
    const user = await userModel.findByEmail(req.body.email);
    const token = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: '1h', algorithm: 'HS256',
    });

    res.status(200).json({ token });
};

module.exports = login;