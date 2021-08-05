const { verifyToken } = require('./jwt');

module.exports = async (req, _res, next) => {
  const { authorization } = req.headers;

  await verifyToken(authorization);
  next();
};
