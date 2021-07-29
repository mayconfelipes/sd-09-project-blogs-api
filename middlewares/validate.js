module.exports = (shema) => (req, _res, next) => {
  const { error } = shema.validate(req.body);

  if (error) return next(error);

  next();
};