const UserService = require('../../services/UserService');

module.exports = async (_req, res) => {
  const result = await UserService();

  res.status(200).json(result);
};
