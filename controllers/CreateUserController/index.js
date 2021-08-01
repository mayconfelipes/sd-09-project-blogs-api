const CreateUserService = require('../../services/CreateUserService');

module.exports = async (req, res) => {
  const { body } = req;
  const result = await CreateUserService(body);

  res.status(201).json({ token: result });
};
