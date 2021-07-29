module.exports = (schema) => (req, _res, next) => { // necessario ter um middleware de erro
  const { error } = schema.validate(req.body);

  if (error) return next(error);

  return next();
};