const CreatePostService = require('../../services/CreatePostService');

module.exports = async (req, res) => {
  const { body } = req;
  const { authorization } = req.headers;

  const result = await CreatePostService(authorization, body);

  res.status(201).json(result);
};
