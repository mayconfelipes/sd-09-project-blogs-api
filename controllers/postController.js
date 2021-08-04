const status = require('../statusCode/status');
const postServices = require('../services/postServices');

const createPost = async (req, res) => {
  const bodyReq = req.body;
  const token = req.headers.authorization;
  const result = await postServices.createPost(bodyReq, token);

// tive ajudar do aluno adrina na explicação
// https://github.com/adrianoforcellini
  if (!result.message) {
    const { id, userId, title, content } = result;
    const output = { id, userId, title, content };
    return res.status(status.CREATE).json(output);
  }
  if (result.message.includes('one of [1, 2]')) {
    return res.status(status.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  return res.status(status.BAD_REQUEST).json(result);
};

module.exports = {
  createPost,
};