module.exports = (err, _req, res, _next) => {
  const STATUS_CODE = err.code || 500;
  res.status(STATUS_CODE).json({ message: err.message });
};
