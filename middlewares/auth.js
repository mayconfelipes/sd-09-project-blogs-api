const jwt = require('jsonwebtoken');

const unauthorized = 401;

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  const JWT_SECRET = 'meuSegredoSuperSecreto';

  if (!token) {
    return res.status(unauthorized).json({ message: 'Token not found' });
  } 
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // console.log(payload, 'Payload');

    if (!payload) { 
      return res.status(unauthorized).json({ message: 'Expired or invalid token' });
    } 
      req.user = payload;
      return next();
  } catch (err) {
    return res.status(unauthorized).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  auth,
};