const UserIdService = require('../../services/UserIdService');

module.exports = async (req, res) => {
  const { id } = req.params;

  const result = await UserIdService(id);

  res.status(200).json(result);
};
