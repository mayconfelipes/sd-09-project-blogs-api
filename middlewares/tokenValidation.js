const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (!decoded) {
      return res.status(400).send({ 
          message: 'Erro ao procurar usuário do token',
      });
    }

    return next();
    } catch (e) {
        return res.status(401).send({ message: 'Expired or invalid token' });
    }
};

module.exports = tokenValidation;