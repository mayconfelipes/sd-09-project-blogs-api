require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = (token) => {
    if (!token) return { error: 'Token not found' };

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const { password, ...userwithoutPasswor } = user;
        return userwithoutPasswor;
    } catch (error) {
        return { error: 'Expired or invalid token' };
    }
};

module.exports = { validateToken };
