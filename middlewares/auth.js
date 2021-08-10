const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    const JWT_SECRET = 'senhaforte';

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        if (!user) {
            return res.status(401).json({ message: 'Expired or invalid token' });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });   
    }
};

module.exports = { auth };