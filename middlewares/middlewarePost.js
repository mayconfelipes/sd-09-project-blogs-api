const { validName } = require('../services');

const validPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const titleOk = validName(title);

  if (titleOk !== true) {
    return res.status(400).json({ message: '"title" is required' });
  }

  const contentOK = validName(content);

  if (contentOK !== true) {
    return res.status(400).json({ message: '"content" is required' });
  }

  const categoryIdsOK = validName(categoryIds);

  if (categoryIdsOK !== true) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  if (categoryIds >= 3) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = { validPost };
