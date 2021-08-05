const jwt = require('jsonwebtoken');
require('dotenv');

const { SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await model.findUser(decoded.data.username);
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};