const jwt = require('jsonwebtoken');
const { User } = require('../models');

const cdi = 401;

/* Mesma chave privada que usamos para criptografar o token.
   Agora, vamos usá-la para descriptografá-lo.
   Numa aplicação real, essa chave jamais ficaria hardcoded no código assim,
   e muitos menos de forma duplicada, mas aqui só estamos interessados em
   ilustrar seu uso ;) */

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
      return res.status(cdi).json({ message: 'Token not found' });
  }
  /* token virá na requisição de header Authorization */
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(cdi).json({ message: 'Expired or invalid token' });
  }
  try { 
      const decoded = jwt.verify(token, secret);
      const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(cdi).json({ message: 'Expired or invalid token' });
    }
    req.user = user;
    next();
  } catch (err) { return res.status(cdi).json({ message: 'Expired or invalid token' }); }
};