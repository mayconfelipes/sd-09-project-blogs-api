module.exports = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) return next({ error: { statusCode: 400, message: '"title" is required' } });
  if (!content) return next({ error: { statusCode: 400, message: '"content" is required' } });
  if (!categoryIds) {
    return next({ error: { statusCode: 400, message: '"categoryIds" is required' } });
  }

  next();
};
