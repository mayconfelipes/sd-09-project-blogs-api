const { validatePostFormat } = require('../services/PostsServices'); 
const { verifyIdsCategory } = require('../services/VerifyIdsCategory');

const ValidateNewPost = async (req, res, next) => {
  const { categoryIds } = req.body;

  const validate = await validatePostFormat(req.body);
  if (validate !== true) return res.status(400).json({ message: validate });

  try {
    const categoriesVerify = await verifyIdsCategory(categoryIds);
    if (!categoriesVerify) return res.status(400).json({ message: '"categoryIds" not found' });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = ValidateNewPost;
