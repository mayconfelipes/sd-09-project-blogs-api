const UserService = require('../services/UserService');

const authVerification = async (req, res, next) => {
  const token = req.headers.authorization;
  const auth = await UserService.verifyToken(token);
  if (auth.code !== undefined) {
    const { code, message } = auth;
    return res.status(code).json({ message });
  }
  next();
};
module.exports = authVerification;
