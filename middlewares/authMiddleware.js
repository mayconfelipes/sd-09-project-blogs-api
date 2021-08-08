const { tokenAuth } = require('../utils/token');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const auth = await tokenAuth(token);

  if (auth.error) return next(auth);

  req.user = auth;

  next();
};

module.exports = authMiddleware;
