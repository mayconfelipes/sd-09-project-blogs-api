const PostService = require('../../services/PostService');

module.exports = async (_req, res) => {
  const result = await PostService();

  res.status(200).json(result);
};
