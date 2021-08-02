const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        req.id = id;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};