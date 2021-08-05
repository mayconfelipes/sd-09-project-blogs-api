const handleError = (error, _req, res, _next) => {
  console.log('no midd de error');
  res.status(error.status).json({ message: error.msg });
};

module.exports = handleError;
