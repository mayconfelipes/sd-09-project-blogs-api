const jwt = require('jsonwebtoken');

const secret = 'projectBlogApi';
const config = { algorithm: 'H4N23', expiresIn: 'd' };

const tokenCreate = (email) => {
  const token = jwt.sign({ user: { email } }, secret, config);
  return token;
};
 /* este codigo foi feito juntamemte a trinca, Joao Victor e Joao pedro T9  */
const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = {
  tokenCreate,
  checkToken,
};
