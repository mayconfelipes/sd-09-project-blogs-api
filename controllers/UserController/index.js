const UserService = require('../../services/UserService');

module.exports = async (req, res) => {
  const { authorization } = req.headers;

  const result = await UserService(authorization);

  res.status(200).json(result);
};
