const jwt = require('jsonwebtoken');
const status = require('../statusCode/status');

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    const secret = 'trybe-t9';

    if (!token) {
        return res.status(status.UNAUTHORIZED).json(status.MISSING_TOKEN);
    }
    try {
        const payload = jwt.verify(token, secret);
        if (!payload) {
            return res.status(status.UNAUTHORIZED).json(status.JWT_BOD_FORMED);
        }
        req.user = payload;
        next();
    } catch (error) {
        return res.status(status.UNAUTHORIZED).json(status.JWT_BOD_FORMED);
    }
};
module.exports = validateJWT;