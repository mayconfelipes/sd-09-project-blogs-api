module.exports = (req, _res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds) return next({ status: 400, message: 'Categories cannot be edited' });

  return next();
};