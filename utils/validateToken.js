require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = (req, _res, next) => {
    const token = req.headers.authorization;
    const TOKEN_NOT_FOUND = { statusCode: 401, message: 'Token not found' };
    if (!token) return next(TOKEN_NOT_FOUND);

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const { password, ...userwithoutPasswor } = user;
        req.user = userwithoutPasswor;
        return next();
    } catch (error) {
        const INVALID_TOKEN = { statusCode: 401, message: 'Expired or invalid token' };
        return next(INVALID_TOKEN);
    }
};

module.exports = { validateToken };
